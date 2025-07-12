import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import ShowToast from "../../../Components/UI/ShowToast";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserData from "../../../Hooks/useUserData";
import { FaTrash } from "react-icons/fa";
import handleDelete from "../../../Hooks/handleDelelte";
import { format, isValid } from "date-fns";

const ManageWatchlist = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserData();
  const queryClient = useQueryClient();

  const { data: watchlist, isLoading } = useQuery({
    queryKey: ["watchlist", userInfo?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/watchlist?email=${userInfo?.email}`
      );
      return data;
    },
    enabled: !!userInfo?.email,
  });

  const { mutate: deleteFromWatchlist } = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.delete(`/users/watchlist/${id}`),
    onSuccess: () => {
      ShowToast("success", "Removed from watchlist");
      queryClient.invalidateQueries(["watchlist"]);
    },
    onError: () => ShowToast("error", "Failed to remove item"),
  });

  console.log(watchlist);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="table-box-container">
      <h2 className="sub-heading mb-5">Manage Watchlist</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Market</th>
              <th>Added On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist?.length > 0 &&
              watchlist.map((item, index) => (
                <tr key={item?._id}>
                  <td>{index + 1}</td>
                  <td>{item?.productName}</td>
                  <td>{item?.marketName}</td>
                  <td>
                    {item?.date
                      ? format(new Date(item.date), "dd MMM yyyy")
                      : "N/A"}
                  </td>
                  <td className="flex gap-2">
                    <Link
                      to="/all-products"
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Add More
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(
                          item?.productName,
                          item?._id,
                          deleteFromWatchlist
                        )
                      }
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {watchlist?.length === 0 && (
        <p className="text-center mt-4">No items in your watchlist.</p>
      )}
    </div>
  );
};

export default ManageWatchlist;
