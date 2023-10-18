import { Button, Image, Space, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCategorys } from "../../API";
import EditCategory from "../../Components/Miscellaneous/EditCategory";
import { DeleteFilled, EditOutlined, } from "@ant-design/icons";
const basePath = "http://localhost:7303/";

function Category() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCategorys().then((res) => {
      setDataSource(res);
      console.log(res);
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
        <Typography.Title level={4}>Category</Typography.Title>
        <EditCategory category={dataSource}>
          <Button
            style={{
              backgroundColor: "rgba(11, 235, 11, 0.38)",
              fontWeight: "bold",
            }}
          >
            Create Category
          </Button>
        </EditCategory >
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "Category ID",
            dataIndex: "cat_id",
          },

          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Image",
            dataIndex: "image",
            render: (image) => {
              return <Image src={basePath + image} width={200} height={140} />;
            },
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
          pageSize: 3,
        }}
      ></Table>
    </Space>
  );
}
export default Category;