import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "../../../Components/UI/ShowToast";
import Pagination from "../../../Components/UI/Pagination";
import { format } from "date-fns";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import handleDelete from "../../../Hooks/handleDelelte";
import { siteTitle } from "../../../Libs/Utility";
import { Helmet } from "@dr.pogodin/react-helmet";

const PRODUCTS_PER_PAGE = 10;

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/products?page=${page}&limit=${PRODUCTS_PER_PAGE}`
      );
      return res.data;
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, update }) => {
      return await axiosSecure.patch(
        `/admin/update-product-status/${id}`,
        update
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allProducts"]);
      ShowToast("success", "Product status updated");
    },
    onError: () => {
      ShowToast("error", "Update failed");
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/vendor/delete-product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allProducts"]);
      ShowToast("success", "Product deleted");
    },
    onError: () => {
      ShowToast("error", "Deletion failed");
    },
  });

  const handleApprove = (id) => {
    updateStatus({ id, update: { status: "approved" } });
  };

  const handleReject = () => {
    if (!rejectionReason  && !rejectionFeedback) return ShowToast("error", "Enter rejection reason and feedback");
    updateStatus({
      id: rejectTarget,
      update: { status: "rejected", rejectionReason,rejectionFeedback },
    });
    setRejectTarget(null);
    setRejectionReason("");
    setRejectionFeedback("");
  };

 

  const totalPages = data?.totalPages || 1;

  return (
    <div className="table-box-container">
            <Helmet>
        <title>{siteTitle} | Admin: Products</title>
      </Helmet>
      <h2 className="sub-heading mb-5">
        Manage Products
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item</th>
              <th>Date</th>
              <th>Price</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((product, i) => (
              <tr key={product?._id}>
                <td>{(page - 1) * PRODUCTS_PER_PAGE + i + 1}</td>
                <td>
                  <img
                    src={product?.image}
                    alt={product?.itemName}
                    className="size-10 object-cover rounded-md"
                  />
                </td>
                <td>{product?.itemName}</td>
                <td>{format(new Date(product?.date), "dd MMM yyyy")}</td>
                <td>{product?.priceUnit}</td>
                <td>{product?.vendorName}</td>
                <td className="capitalize">
                  <div className="flex flex-col">
                    <span>{product.status}</span>
                    {product.status === "rejected" &&
                      product?.rejectionReason && (
                        <span className="text-xs text-red-500">
                          {product.rejectionReason}
                        </span>
                      )}
                  </div>
                </td>
                <td className="flex flex-wrap gap-1">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() =>
                      navigate(`/dashboard/update-product/${product._id}`)
                    }
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(product.itemName,product._id,deleteProduct)}
                  >
                    <FaTrash />
                  </button>
                  {product.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(product._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setRejectTarget(product._id)}
                        className="btn btn-xs btn-warning text-gray-800"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">Reject Product</h3>
            <input
              type="text"
              placeholder="Enter reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="input input-bordered w-full mb-3"
            />

             <input
              type="text"
              placeholder="Give your feedback"
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectTarget(null)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button onClick={handleReject} className="btn btn-sm btn-error">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedProduct && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h2 className="font-bold text-xl md:text-2xl mb-2 text-primary">
              {selectedProduct.itemName}
            </h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.itemName}
              className="rounded-lg w-full max-h-65 object-cover mb-4"
            />
            <p>
              <strong>Price:</strong> {selectedProduct.priceUnit}
            </p>
            <p>
              <strong>Status:</strong> {selectedProduct.status}
            </p>
            <p>
              <strong>Vendor:</strong> {selectedProduct.vendorName}
            </p>
            <p>
              <strong>Market:</strong> {selectedProduct.marketName}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.itemDescription}
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageProducts;
