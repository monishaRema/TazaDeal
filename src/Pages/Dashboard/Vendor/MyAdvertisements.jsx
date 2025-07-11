import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Pagination from "../../../Components/UI/Pagination";
import handleDelete from "../../../Hooks/handleDelelte";
import ShowToast from "../../../Components/UI/ShowToast";

const ADS_PER_PAGE = 10;

const MyAdvertisements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [selectedAd, setSelectedAd] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["vendorAds", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/vendor/ads?page=${page}&limit=${ADS_PER_PAGE}`
      );
      return res.data;
    },
  });

  const { mutate: deleteAd } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/vendor/ads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["vendorAds"]);
      ShowToast("success", "Advertisement has been deleted.");
    },
    onError: () => {
      ShowToast("error", "Failed to delete the advertisement.");
    },
  });



  const totalPages = data?.totalPages || 1;

  return (
    <div className="table-box-container">
      <h2 className="sub-heading mb-5">
        My Advertisements
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Short Descripton</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.ads?.map((ad, index) => (
              <tr key={ad._id}>
                <td>{(page - 1) * ADS_PER_PAGE + index + 1}</td>
                <td>
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="size-10 rounded-md object-cover"
                  />
                </td>
                <td>{ad.title}</td>
                <td>
                  {ad.description.length > 50
                    ? `${ad.description.slice(0, 50)}...`
                    : ad.description}
                </td>
                <td>{format(new Date(ad.createdAt), "dd MMM yyyy")}</td>
                <td className="capitalize">{ad.status}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedAd(ad)}
                    className="btn btn-xs btn-outline"
                  >
                    <FaEye />
                  </button>
                  <Link
                    to={`/dashboard/update-advertisement/${ad._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(ad.title,ad._id,deleteAd)}
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
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      )}

      {/* Modal for viewing ad */}
      {selectedAd && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
           
            <img
              src={selectedAd.image}
              alt={selectedAd.title}
              className="rounded-lg w-full max-h-65 object-cover mb-4"
            />

             <h2 className="font-bold text-xl md:text-2xl mb-2 text-primary">
              {selectedAd.title}
            </h2>
            <p>
              <strong>Status:</strong> {selectedAd.status}
            </p>
            <p>
              <strong>Description:</strong> {selectedAd.description}
            </p>

            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setSelectedAd(null)}
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

export default MyAdvertisements;
