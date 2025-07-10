import { toast, Slide } from "react-toastify";

const ShowToast = (status, message) => {
  const toastTypes = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warn,
    default: toast,
  };

  const show = toastTypes[status] || toast;

  show(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  });
};

export default ShowToast;
