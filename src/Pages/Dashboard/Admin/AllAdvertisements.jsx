import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "../../../Components/UI/ShowToast";
import Pagination from "../../../Components/UI/Pagination";
import { format } from "date-fns";
import Swal from "sweetalert2";
import handleDelete from "../../../Hooks/handleDelelte";
import { siteTitle } from "../../../Libs/Utility";
import { Helmet } from "@dr.pogodin/react-helmet";

const ADS_PER_PAGE = 10;

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionFeedback, setRejectionFeedback] = useState("");
  const [selectedAd, setSelectedAd] = useState(null); // NEW

  const { data, isLoading } = useQuery({
    queryKey: ["allAdvertisements", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/ads?page=${page}&limit=${ADS_PER_PAGE}`);
      return res.data;
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, update }) => {
      return await axiosSecure.patch(`/admin/ads/${id}`, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allAdvertisements"]);
      ShowToast("success", "Advertisement status updated");
    },
    onError: () => {
      ShowToast("error", "Update failed");
    },
  });

  const { mutate: deleteAd } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/admin/ads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allAdvertisements"]);
      ShowToast("success", "Advertisement deleted");
    },
    onError: () => {
      ShowToast("error", "Delete failed");
    },
  });

  const handleApprove = (id) => {
    updateStatus({ id, update: { status: "approved" } });
  };

  const handleReject = () => {
    if (!rejectionReason || !rejectionFeedback) {
      return ShowToast("error", "Enter reason and feedback");
    }
    updateStatus({
      id: rejectTarget,
      update: { status: "rejected", rejectionReason, rejectionFeedback },
    });
    setRejectTarget(null);
    setRejectionReason("");
    setRejectionFeedback("");
  };

  return (
    <div className="table-box-container">
      <Helmet>
        <title>{siteTitle} | Admin: Ads</title>
      </Helmet>
      <h2 className="sub-heading mb-5">Manage Advertisements</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.ads?.map((ad, i) => (
              <tr key={ad._id}>
                <td>{(page - 1) * ADS_PER_PAGE + i + 1}</td>
                <td>{ad.title}</td>
                <td>{ad.description?.slice(0, 50)}...</td>
                <td>{format(new Date(ad.createdAt), "dd MMM yyyy")}</td>
                <td className="capitalize">{ad.status}</td>
                <td className="flex gap-1 items-center">
                  <button
                    onClick={() => setSelectedAd(ad)}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </button>
                  {ad.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(ad._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setRejectTarget(ad._id)}
                        className="btn btn-xs btn-warning"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(ad.title, ad._id, deleteAd)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.totalPages > 1 && (
        <Pagination totalPages={data.totalPages} page={page} setPage={setPage} />
      )}

      {/* Rejection Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-3">Reject Advertisement</h2>
            <input
              type="text"
              className="theme-input w-full mb-3"
              placeholder="Rejection Reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <textarea
              className="theme-input w-full mb-3"
              placeholder="Feedback"
              value={rejectionFeedback}
              onChange={(e) => setRejectionFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button className="btn btn-sm" onClick={() => setRejectTarget(null)}>
                Cancel
              </button>
              <button className="btn btn-sm btn-error" onClick={handleReject}>
                Reject
              </button>
            </div>
          </div>
        </div>
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

export default AllAdvertisements;
