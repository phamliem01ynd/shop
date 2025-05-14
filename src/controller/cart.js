const { where } = require("sequelize"); // 'where' có thể không cần trực tiếp ở đây
const db = require("../models"); // Giả sử db chứa các model như db.Cart và db.Cart_detail
const sequelize = db.sequelize; // Lấy instance sequelize để dùng transaction

const addToCart = async (req, res) => {
  // Bắt đầu một transaction
  const t = await sequelize.transaction();

  try {
    const userId = req.user.id; // Giả sử req.user được gán bởi middleware xác thực
    const { productId, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!productId || !quantity || quantity <= 0) {
      await t.rollback(); // Hoàn tác transaction
      return res.status(400).json({ message: "ID sản phẩm hoặc số lượng không hợp lệ" });
    }

    // 1. Tìm giỏ hàng ACTIVE của người dùng, hoặc tạo mới nếu không tồn tại
    let cart = await db.Cart.findOne({
      where: {
        user_id: userId,
        status: 'active' // Tìm giỏ hàng có trạng thái 'active'
      },
      transaction: t // Bao gồm trong transaction
    });

    if (!cart) {
      // Tạo giỏ hàng active mới nếu không tìm thấy
      cart = await db.Cart.create({
        user_id: userId,
        status: 'active'
      }, { transaction: t }); // Bao gồm trong transaction
    }

    // Tại thời điểm này, 'cart' chứa giỏ hàng active (tìm thấy hoặc vừa tạo)
    const cartId = cart.id;

    // 2. Kiểm tra xem sản phẩm đã tồn tại trong chi tiết của giỏ hàng này chưa
    let Cart_detail = await db.Cart_detail.findOne({
      where: {
        cart_id: cartId,
        product_id: productId
      },
      transaction: t // Bao gồm trong transaction
    });

    let resultDetail;
    if (Cart_detail) {
      // Sản phẩm đã tồn tại, cập nhật số lượng
      Cart_detail.quantity += quantity; // Cộng dồn số lượng
      resultDetail = await Cart_detail.save({ transaction: t }); // Lưu thay đổi & bao gồm trong transaction
    } else {
      // Sản phẩm chưa tồn tại, tạo bản ghi chi tiết giỏ hàng mới
      // Tùy chọn: Bạn có thể lấy giá sản phẩm ở đây nếu lưu price_at_add_time
      // const product = await db.Product.findByPk(productId);
      // const currentPrice = product ? product.price : 0;
      resultDetail = await db.Cart_detail.create({
        cart_id: cartId,
        product_id: productId,
        quantity: quantity
        // price_at_add_time: currentPrice // Ví dụ
      }, { transaction: t }); // Bao gồm trong transaction
    }

     // Tùy chọn: Cập nhật dấu thời gian updated_at của giỏ hàng
    await cart.changed('updated_at', true); // Đánh dấu updated_at đã thay đổi
    await cart.save({ transaction: t });

    // Nếu mọi thứ thành công, commit transaction
    await t.commit();

    // Trả về chi tiết giỏ hàng đã được tạo/cập nhật
    return res.status(200).json({ message: "Sản phẩm đã được thêm/cập nhật vào giỏ hàng", cartItem: resultDetail });

  } catch (error) {
    // Nếu có lỗi xảy ra, rollback transaction
    await t.rollback();
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    // Cung cấp thông báo lỗi cụ thể hơn nếu có thể
     if (error.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(400).json({ message: "ID sản phẩm không hợp lệ hoặc không tồn tại" });
     }
    return res.status(500).json({ message: "Lỗi xử lý yêu cầu giỏ hàng" });
  }
};

module.exports = { addToCart }; // Export hàm