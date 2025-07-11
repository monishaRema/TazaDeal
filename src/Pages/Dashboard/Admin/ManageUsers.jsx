import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ShowToast from "../../../Components/UI/ShowToast";
import Pagination from "../../../Components/UI/Pagination";
import useDebounce from "../../../Hooks/useDebounce";

const USERS_PER_PAGE = 10;
const roles = ["user", "vendor", "admin"];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers", page, debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin`, {
        params: {
          page,
          limit: USERS_PER_PAGE,
          search: debouncedSearch,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = userData?.users || [];
  const totalPages = userData?.totalPages || 1;

  const { mutate: updateUser } = useMutation({
    mutationFn: async ({ email, update }) =>
      await axiosSecure.patch(`/admin/update-user/${email}`, update),
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      ShowToast("success", "User updated");
    },
    onError: () => ShowToast("error", "Update failed"),
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
    if (!rejectionReason) return ShowToast("error", "Please enter a reason");
    updateUser({
      email: rejectTarget,
      update: {
        vendorRequestStatus: "rejected",
        vendorRejectionReason: rejectionReason,
        status: "rejected vendor",
      },
    });
    setRejectTarget(null);
    setRejectionReason("");
  };

  return (
    <div className="table-box-container">
      <div className="flex flex-col gap-5 md:flex-row justify-between mb-5">
            <h2 className="sub-heading">
        Manage Users
      </h2>

      {/* Search Bar */}
      <div className="flex justify-end flex-1">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); 
          }}
        />
      </div>
      </div>


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
                  <th>Update Role</th>
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
                    <td>{u?.name}</td>
                    <td>{u?.email}</td>
                    <td>{u?.role}</td>
                    <td>
                      {u?.role !== "admin" && (
                        <select
                          className="select select-sm select-bordered"
                          value={u?.role}
                          onChange={(e) =>
                            handleRoleChange(u?.email, e.target.value)
                          }
                        >
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="capitalize">
                      {u?.vendorRequestStatus}
                      {u?.vendorRequestStatus === "rejected" && (
                        <p className="text-xs text-red-500">
                          {u?.vendorRejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="flex gap-1">
                      {u?.vendorRequestStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(u?.email)}
                            className="btn btn-xs btn-primary"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectTarget(u?.email)}
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

          {totalPages > 1 && (
            <Pagination totalPages={totalPages} page={page} setPage={setPage} />
          )}
        </>
      )}

      {/* Reject Modal */}
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
