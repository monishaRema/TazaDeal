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
import PriceTrends from "../Pages/Dashboard/User/PriceTrends";
import ManageWatchlist from "../Pages/Dashboard/User/ManageWatchlist";
import MyProducts from "../Pages/Dashboard/Vendor/MyProducts";
import AddAdvertisement from "../Pages/Dashboard/Vendor/AddAdvertisement";
import MyAdvertisements from "../Pages/Dashboard/Vendor/MyAdvertisements";
import AllOrders from "../Pages/Dashboard/Admin/AllOrders";
import AllAdvertisements from "../Pages/Dashboard/Admin/AllAdvertisements";
import ManageProducts from "../Pages/Dashboard/Admin/ManageProducts";
import UpdateProduct from "../Pages/Dashboard/Vendor/UpdateProduct";
import UpdateAdvertisement from "../Pages/Dashboard/Vendor/UpdateAdvertisement";
import ProductDetails from "../Pages/ProductDetails";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "product-details/:id",
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      }
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
      {
        path: "price-trends",
        element: <PriceTrends></PriceTrends>,
      },
      {
        path: "manage-watchlist",
        element: <ManageWatchlist></ManageWatchlist>,
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
      {
        path: "manage-products",
        element: (
          <AdminRoute>
         <ManageProducts></ManageProducts>
          </AdminRoute>
        ),
      },
      {
        path: "all-advertisements",
        element: (
          <AdminRoute>
          <AllAdvertisements></AllAdvertisements>
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrders></AllOrders>
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
      {
        path: "my-products",
        element: (
          <VendorRoute>
            <MyProducts></MyProducts>
          </VendorRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct></UpdateProduct>
      },
      {
        path: "add-advertisement",
        element: (
          <VendorRoute>
            <AddAdvertisement></AddAdvertisement>
          </VendorRoute>
        ),
      },
      {
        path: "my-advertisements",
        element: (
          <VendorRoute>
            <MyAdvertisements></MyAdvertisements>
          </VendorRoute>
        ),
      },
      {
        path: "update-advertisement/:id",
        element: (
          <VendorRoute>
            <UpdateAdvertisement></UpdateAdvertisement>
          </VendorRoute>
        ),
      },
    ],
  },
]);
