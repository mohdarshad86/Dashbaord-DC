export const getOrders = () => {
  return fetch("http://localhost:7303/api/cart").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getProduct = () => {
  return fetch("http://localhost:7303/api/products").then((res) => res.json());
};
export const postProduct = (data) => {
  console.log("data", data);
  return fetch("http://localhost:7303/api/products",{ method: 'POST', body: data }).then((res) => res.json());
}

export const getCustomers = () => {
  return fetch("http://localhost:7303/api/users").then((res) => res.json());
};

export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};

export const getBanners = () => {
  return fetch("http://localhost:7303/api/banner").then((res) => res.json());
};

export const getCategorys = () => {
  return fetch("http://localhost:7303/api/category").then((res) => res.json());
};
export const postCategory = (data) => {
  console.log("data", data);
  return fetch("http://localhost:7303/api/category", { method: 'POST', body: data }).then((res) => res.json());
}
export const deleteCategory = (data) => {
  console.log("data", data);
  return fetch("http://localhost:7303/api/category", { method: 'POST', body: data }).then((res) => res.json());
}


export const sendOTP = () => {
  return fetch("http://localhost:7303/api/LOGIN", { method: 'POST' }).then((res) => res.json());
};
