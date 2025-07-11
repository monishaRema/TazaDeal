import Swal from "sweetalert2";

  const handleDelete = (itemName,id,cb) => {
    Swal.fire({
       title: `Delete ${itemName}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#146131",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cb(id);
      }
    });
  };
  export default handleDelete;