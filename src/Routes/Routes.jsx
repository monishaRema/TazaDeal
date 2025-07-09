import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout"
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";




export const routes = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        Component: Home
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
    element:<DashboardLayout></DashboardLayout>,
    children: [

    ]
  }
]);