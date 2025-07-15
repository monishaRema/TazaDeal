import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../../Components/UI/Pagination";
import { format } from "date-fns";
import handleDelete from "../../../Hooks/handleDelelte";
import ShowToast from "../../../Components/UI/ShowToast";
import { Helmet } from "@dr.pogodin/react-helmet";
import { siteTitle } from "../../../Libs/Utility";

const PRODUCTS_PER_PAGE = 10;

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["vendorProducts", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/vendor/my-products?page=${page}&limit=${PRODUCTS_PER_PAGE}`
      );
      return res.data;
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id) => {
     return await axiosSecure.delete(`/vendor/delete-product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["vendorProducts"]);
    ShowToast("success", "Product has been deleted.");
    },
    onError: () => {
     ShowToast("error", "Failed to delete the product.");
    },
  });



  const totalPages = data?.totalPages || 1;

  return (
    <div className="table-box-container">
      <Helmet>
        <title>{siteTitle} | Vendor: Products</title>
      </Helmet>
      <h2 className="sub-heading mb-5">
        My Products
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Date</th>

              <th>Price</th>
              <th>Market</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((product, index) => (
              <tr key={product._id}>
                <td>{(page - 1) * PRODUCTS_PER_PAGE + index + 1}</td>
                <td>
                  <img
                    src={product?.image}
                    alt={product?.itemName}
                    className="size-10 rounded-md object-cover"
                  />
                </td>
                <td>{product?.itemName}</td>
                <td>{format(new Date(product?.date), "dd MMM yyyy")}</td>
                <td>{product?.priceUnit}</td>
                <td>{product?.marketName}</td>
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
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="btn btn-xs btn-outline"
                  >
                    <FaEye />
                  </button>
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.itemName,product._id,deleteProduct)}
                    className="btn btn-xs btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        ></Pagination>
      )}

      {/* Modal for viewing product */}
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
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>Market:</strong> {selectedProduct.marketName}
            </p>
            <p>
              <strong>Description:</strong> {selectedProduct.itemDescription}
            </p>
            <p>
              <strong>Status:</strong> {selectedProduct.status}
            </p>
            {selectedProduct.status == "rejected" && (
              <>
                <p>
                  <strong>Rejection Reason:</strong>{" "}
                  {selectedProduct.rejectionReason}
                </p>
                <p>
                  <strong>Admin Feedback:</strong>{" "}
                  {selectedProduct.rejectionFeedback}
                </p>
              </>
            )}

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

export default MyProducts;
