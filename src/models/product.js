"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      description: DataTypes.TEXT,
      category_id: DataTypes.STRING,
      status: DataTypes.BLOB,
      sold: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
