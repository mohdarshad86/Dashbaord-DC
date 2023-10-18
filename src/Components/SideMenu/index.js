import {
  AppstoreOutlined,
  FileImageTwoTone,
  OrderedListOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            key: "/",
            icon: <AppstoreOutlined />,
          },
          {
            label: "Customers",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Category",
            key: "/categorys",
            icon: <OrderedListOutlined />,
          },
          {
            label: "Products",
            key: "/products",
            icon: <ShopOutlined />,
          },
          {
            label: "Banners",
            key: "/banners",
            icon: <FileImageTwoTone />,
          },
          {
            label: "Orders",
            key: "/orders",
            icon: <ShoppingCartOutlined />,
          },          
          
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
