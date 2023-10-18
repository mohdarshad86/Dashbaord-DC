import { Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Product from "../../Pages/Product";
import Orders from "../../Pages/Orders";
import Banner from "../../Pages/Banners";
import Category from "../../Pages/Category";
import Login from "../../Pages/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/products" element={<Product />}/>
      <Route path="/orders" element={<Orders />}/>
      <Route path="/customers" element={<Customers />}/>
      <Route path="/banners" element={<Banner />}/>
      <Route path="/categorys" element={<Category />}/>
    </Routes>
  );
}
export default AppRoutes;
