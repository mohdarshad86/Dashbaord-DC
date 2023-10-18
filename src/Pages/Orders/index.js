import React, { useEffect, useState } from "react";
import { Avatar, Space, Table, Typography, Dropdown, Menu, Tooltip, Button, DatePicker } from "antd";
import { getOrders } from "../../API";
import { DownOutlined, FilePdfFilled } from "@ant-design/icons";
const { RangePicker } = DatePicker;

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      console.log(res);
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  const renderDeliveryStatus = (status) => {
    switch (status) {
      case "pending":
      case "placed":
      case "prepared":
      case "onway":
        const menu = (
          <Menu>
            <Menu.Item key="1">Pending</Menu.Item>
            <Menu.Item key="2">placed</Menu.Item>
            <Menu.Item key="3">prepared </Menu.Item>
            <Menu.Item key="4">onway</Menu.Item>
            <Menu.Item key="5">Cancelled</Menu.Item>
            <Menu.Item key="6">Delivered</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <span>
              {status} <DownOutlined />
            </span>
          </Dropdown>
        );
      case "cancelled":
        return <span style={{ color: "red", fontWeight: "bold" }}>{status}</span>;
      case "delivered":
        return <span style={{ color: "green", fontWeight: "bold" }}>{status}</span>;
      default:
        return status;
    }
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ padding: "2px 8px", border: "2px solid black" }}>All Orders Detail:</Typography.Title>
      <Space direction="vertical">
        <Typography.Title level={2}> Search By Datewise</Typography.Title>
        <Space>
          <RangePicker
            placeholder={['From', 'To']}
            format="YYYY-MM-DD"
            onChange={handleDateChange}
            value={dateRange}
          />
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
            title: "Customer (Code)",
            dataIndex: "reg_id",
          },
          {
            title: "Product Id",
            dataIndex: "product_id",
          },
          {
            title: "Thumbnail",
            dataIndex: "images",
            render: (link) => {
              return <Avatar src={JSON.parse(link)[0]} />;
            },
          },
          {
            title: "Title",
            dataIndex: "product_name",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <p>${value}</p>
          },
          {
            title: "Discount",
            dataIndex: "discount",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Total",
            dataIndex: ["price", "quantity"],
            render: (id, total) => {
              return <span>{total.price * total.quantity}</span>;
            },
          },
          {
            title: "Date",
            dataIndex: "order_date",
            render: (id, date) => {
              return <span>{Date(date.order_date)}</span>;
            },
          },
          {
            title: "Order Status",
            dataIndex: "order_status",
            render: (status) => {
              return (
                <>
                  {Number(status) === 0 ? <span>Cart</span> :
                    Number(status) === 1 ? <span>Order Placed</span> :
                      <span>Cancelled</span>}
                </>
              );
            },
          },
          {
            title: "Delivery Status",
            dataIndex: "delivery_status",
            render: renderDeliveryStatus,
          },
          {
            title: "Action",
            render: (record) => {
              return (
                <Tooltip title="Print Invoice">
                  <Button
                    type="primary"
                    icon={<FilePdfFilled />}
                    onClick={() => {
                      // Handle edit button click here
                      console.log("Edit record:", dataSource);
                    }}
                  >
                  </Button>
                </Tooltip>
              );
            },
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
export default Orders;
