import { Image, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getBanners } from "../../API";

function Banner() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    getBanners().then((res) => {
      setDataSource(res);
      console.log(res);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Banner</Typography.Title>
      <Table
        loading={loading}
        columns={[         
          {
            title: "Image",
            dataIndex: "image",
            render: (image) => {
              return <Image src={image} width={200} height={140}/>;
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
export default Banner;