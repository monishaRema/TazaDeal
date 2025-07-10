import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "../../../Components/UI/ShowToast";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const roles = ["user", "vendor", "admin"];
const USERS_PER_PAGE = 10;

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectTarget, setRejectTarget] = useState(null);
  const [page, setPage] = useState(1);

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/admin?page=${page}&limit=${USERS_PER_PAGE}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const users = userData?.users || [];
  const totalPages = userData?.totalPages || 1;

  const { mutate: updateUser } = useMutation({
    mutationFn: async ({ email, update }) => {
      return await axiosSecure.patch(`/users/admin/update-user/${email}`, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      ShowToast("success", "Update successful");
    },
    onError: () => {
      ShowToast("error", "Update failed");
    },
  });

  const handleRoleChange = (email, role) => {
    updateUser({ email, update: { role } });
  };

  const handleApprove = (email) => {
    updateUser({
      email,
      update: {
        vendorRequestStatus: "approved",
        role: "vendor",
        status: "active vendor",
      },
    });
  };

  const handleReject = () => {
    if (!rejectionReason) {
      ShowToast("error", "Please enter a reason");
      return;
    }

    updateUser({
      email: rejectTarget,
      update: {
        vendorRequestStatus: "rejected",
        vendorRejectionReason: rejectionReason,
        status: "rejected vendor",
      },
    });

    setRejectionReason("");
    setRejectTarget(null);
  };

  return (
    <div className="p-5 md:p-8 bg-white rounded-xl">
      <h2 className="text-2xl md:text-3xl text-primary font-bold mb-4">
        Manage Users
      </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load users</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Vendor Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}>
                    <td>{(page - 1) * USERS_PER_PAGE + i + 1}</td>
                    <td>
                      <img
                        src={u?.photoURL}
                        alt={u.name}
                        className="size-10 rounded-md object-cover"
                      />
                    </td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      {u.role !== "admin" ? (
                        <select
                          className="select select-sm select-bordered"
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u.email, e.target.value)
                          }
                        >
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{u.role}</span>
                      )}
                    </td>
                    <td className="capitalize">
                      {u.vendorRequestStatus || ""}
                      {u.vendorRequestStatus === "rejected" && (
                        <div className="text-xs text-red-500">
                          {u.vendorRejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="flex gap-1">
                      {u.vendorRequestStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(u.email)}
                            className="btn btn-xs btn-primary"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectTarget(u.email)}
                            className="btn btn-xs btn-error text-gray-800"
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 items-center flex-wrap">
              <button
                className="btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <FaAngleLeft />
              </button>

              {[...Array(totalPages).keys()].map((num) => {
                const pageNum = num + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`rounded-full size-8 flex justify-center items-center border border-gray-300 text-sm font-medium 
                      ${
                        page === pageNum
                          ? "bg-primary text-white"
                          : "hover:bg-gray-200 text-gray-700"
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="btn btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Dialog for rejection reason */}
      {rejectTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-2">
              Reject Vendor Request
            </h3>
            <input
              type="text"
              placeholder="Enter reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
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
    </div>
  );
};

export default ManageUsers;
