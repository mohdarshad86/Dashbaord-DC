import { Avatar, Button, Dropdown, Input, Menu, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";
import { DownOutlined } from "@ant-design/icons";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      console.log(res);
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Space direction="vertical">
        <Typography.Title level={2}> Search By Name</Typography.Title>
        <Space>
        <Dropdown 
        overlay={(
          <Menu>
            <Menu.Item key="1">Name</Menu.Item>
            <Menu.Item key="2">Email</Menu.Item>
            <Menu.Item key="3">Reg_id </Menu.Item>
            <Menu.Item key="4">Pincode</Menu.Item>
            <Menu.Item key="5">City</Menu.Item>
          </Menu>
        )}
        trigger={["click"]}
        >
            <span>
              Name <DownOutlined />
            </span>
          </Dropdown>
          <Input
            placeholder="Search in Customers" />
          <Button
            type="primary"
          >
            Filter
          </Button>
        </Space>
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "profile_pic",
            render: (link) => {
              return <Avatar src={link ? link : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"} />;
            },
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Reg_ID",
            dataIndex: "reg_id",
          },

          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "mobile",
          },

          {
            title: "City",
            dataIndex: ['city', 'area', 'flat_no'],
            render: (id, address) => {
              return (
                <span>
                  Flat no. {address.flat_no}, {address.area}, {address.city}
                </span>
              );
            },
          },
          {
            title: "Landmark",
            dataIndex: "landmark",
          },
          {
            title: "Pincode",
            dataIndex: "pincode",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Customers;
