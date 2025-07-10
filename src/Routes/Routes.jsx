import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AddProduct from "../Pages/Dashboard/Vendor/AddProduct";
import AllProducts from "../Pages/AllProducts";
import PrivateRoute from "./PrivateRoute";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import BeVendor from "../Pages/Dashboard/User/BeVendor";
import MyProfile from "../Pages/Dashboard/MyProfile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-products",
        element: <AllProducts></AllProducts>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      // users routes only
      {
        path: "be-vendor",
        element: <BeVendor></BeVendor>,
      },
      // admin routes only
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      // vendor routes only

      {
        path: "add-product",
        element: (
          <VendorRoute>
            <AddProduct />
          </VendorRoute>
        ),
      },
    ],
  },
]);
