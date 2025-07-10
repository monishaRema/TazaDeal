import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout"
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddProduct from "../Pages/Dashboard/Vendor/AddProduct";
import AllProducts from "../Pages/AllProducts";




export const routes = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home
      },{
        path: "all-products",
        element: <AllProducts></AllProducts>
      }
    ]
  },
  {
    path:"/auth",
    element:<AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "register",
        element: <Register></Register>
      }

    ]
  },
  {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      path: "add-product", // ✅ just relative path
      element: <AddProduct />
    }
  ]
}
]);