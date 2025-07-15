import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";
import { siteTitle } from "../../../Libs/Utility";
import { Helmet } from "@dr.pogodin/react-helmet";


const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-orders");
      return res.data;
    },
  });

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="table-box-container">
            <Helmet>
        <title>{siteTitle} | Admin: All Orders</title>
      </Helmet>
      <h2 className="sub-heading mb-5">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Market</th>
              <th>Buyer</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.productName}</td>
                <td>{order.marketName}</td>
                <td>{order.buyerEmail}</td>
                <td>{order.vendorName}</td>
                <td>৳{order.totalPrice}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-accent"
                    onClick={() => openModal(order)}
                  >
                    View Details
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-primary/20 backdrop-blur-xs z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
              <h3 className="sub-heading mb-4">Order Details</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Product:</strong> {selectedOrder.productName}</li>
                <li><strong>Market:</strong> {selectedOrder.marketName}</li>
                <li><strong>Price:</strong> ৳{selectedOrder.totalPrice}</li>
                <li><strong>Transaction ID:</strong> {selectedOrder.transactionId}</li>
                <li><strong>Buyer Email:</strong> {selectedOrder.buyerEmail}</li>
                <li><strong>Vendor:</strong> {selectedOrder.vendorName}</li>
                <li><strong>Vendor Email:</strong> {selectedOrder.vendorEmail}</li>
                <li><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</li>
              </ul>

              <div className="mt-4 text-right">
                <button onClick={closeModal} className="btn btn-sm btn-error">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
