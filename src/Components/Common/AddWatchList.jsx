import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import ShowToast from "../UI/ShowToast";
import useUserData from "../../Hooks/useUserData";
import { FaRegHeart } from "react-icons/fa";
import useWatchlistCount from "../../Hooks/useWatchListCount";

const AddWatchList = ({ id, from }) => {
  const axiosSecure = useAxiosSecure();
  const { userInfo, isLoading } = useUserData();
  const {count, refetch} = useWatchlistCount()
  const { role } = userInfo || {};
  const { mutate: addToWatchlist } = useMutation({
    mutationFn: async () =>
      await axiosSecure.post("/users/watchlist", { productId: id }),
    onSuccess: () => {
        ShowToast("success", "Added to watchlist")
        refetch();
    },
    onError: () => ShowToast("error", "Already in watchlist or failed"),
  });
if(isLoading) return <span className="loading loading-ring loading-md"></span>
  return (
    <button
      onClick={() => addToWatchlist()}
      className={
        from == "details" ? "btn btn-outline btn-accent hover:text-white" : "size-10 rounded-full flex justify-center items-center border border-gray-200  text-accent/70 hover:text-accent hover:border-accent"
      }
      disabled={role === "admin" || role === "vendor"}
    >
      {from == "details" ? (
        "Add to Watchlist"
      ) : (
        <>
          <FaRegHeart className="text-xl"/>
        </>
      )}
    </button>
  );
};

export default AddWatchList;
