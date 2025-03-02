import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import "./user.scss";
import { getUser } from "../../utils/api";
function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getUser();
      setData(result);
    };
    fetchApi();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Button>Thêm</Button>
          <Button>Sửa</Button>
          <Button>Xóa</Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        className="table"
        rowKey={"id"}
        bordered
        dataSource={data}
        columns={columns}
      />
    </>
  );
}

export default User;
