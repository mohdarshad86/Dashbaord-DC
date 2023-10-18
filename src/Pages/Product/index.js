import { Avatar, Button, Rate, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { getProduct } from "../../API";
import EditProduct from "../../Components/Miscellaneous/EditProduct";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
const basePath = "http://localhost:7303/";

function Product() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    getProduct().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Space style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
      }}>
        <Typography.Title level={4}>Product</Typography.Title>
        <EditProduct product={dataSource}>
          <Button
            style={{
              backgroundColor: "rgba(11, 235, 11, 0.38)",
              fontWeight: "bold",
            }}
          >
            Create Product
          </Button>
        </EditProduct >
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "Product Id",
            dataIndex: "product_id",
          },
          {
            title: "Thumbnail",
            dataIndex: "images",
            render: (link) => {
              // console.log(JSON.parse(link));
              console.log(dataSource);
              
              return <Avatar src={basePath + JSON.parse(link)[0]} />;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Unit",
            dataIndex: "unit",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Old Price",
            dataIndex: "old_price",
            render: (value) => <span style={{textDecoration:'line-through'}}>${value}</span>,
          },
          {
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Rating Count",
            dataIndex: "rating_count",
            
          },
          {
            title: "Offer",
            dataIndex: "offer",
          },
          {
            title: "Action",
            render: (record) => {
              return (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Tooltip title="Edit">
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => {
                        // Handle edit button click here
                        console.log("Edit record:", dataSource);
                      }}
                    >
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button
                      type="default"
                      icon={<DeleteFilled />}
                      onClick={(record) => {
                        // Handle update button click here
                        console.log("Deleting record:", record);
                      }}
                    >
                    </Button>
                  </Tooltip>
                </div>
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
export default Product;
