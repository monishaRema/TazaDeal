import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserData from "../../../Hooks/useUserData";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";
import NoItemsFound from "../../../Components/UI/NoItemsFound";


const MyOrderList = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserData();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders", userInfo?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/my-orders?email=${userInfo.email}`);
      return res.data;
    },
    enabled: !!userInfo?.email,
  });
  console.log(orders)
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="table-box-container">
      <h2 className="sub-heading mb-5">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Market</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 && orders?.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.productName}</td>
                <td>{order.marketName}</td>
                <td>৳{order.totalPrice}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/product-details/${order.productId}`}
                    className="btn btn-sm btn-outline btn-accent"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders?.length === 0 && <NoItemsFound items={'orders'}></NoItemsFound>}
      </div>
    </div>
  );
};

export default MyOrderList;
