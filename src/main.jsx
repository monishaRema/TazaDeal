import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routes } from "./Routes/Routes.jsx";
import AuthProvider from "./Contex/AuthProvider.jsx";
import "./index.css";
import "./app.css";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { Slide, ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()



createRoot(document.getElementById("root")).render(
  <StrictMode>
       <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>
);
