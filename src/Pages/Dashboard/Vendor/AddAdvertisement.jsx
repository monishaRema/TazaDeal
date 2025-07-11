import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ShowToast from "../../../Components/UI/ShowToast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AddAdvertisement = () => {
  const { user } = useAuth();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: addAd, isLoading: uploading } = useMutation({
    mutationFn: async (formData) => {
      const imageFile = formData.image[0];
      const uploadData = new FormData();
      uploadData.append("image", imageFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        uploadData
      );

      const imageUrl = imgbbRes?.data?.data?.url;
      if (!imageUrl) throw new Error("Image upload failed");

      const adPayload = {
        vendorEmail: user?.email,
        vendorName: user?.displayName,
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: imageUrl,
        status: "pending",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/vendor/ads", adPayload);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.insertedId) {
        ShowToast("success", "Advertisement submitted for review");
        queryClient.invalidateQueries(["ads"]);
        reset();
        navigate('/dashboard/my-advertisements')
      } else {
        ShowToast("error", "Ad submission failed");
      }
    },
    onError: (error) => {
      ShowToast("error", "Something went wrong");
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 shadow bg-white rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Create New Advertisement
      </h2>
      <form onSubmit={handleSubmit(addAd)} className="space-y-4">
        {/* Ad Title */}
        <div>
          <label className="theme-label">Ad Title</label>
          <input
            type="text"
            placeholder="Summer Sale Promo"
            {...register("title", { required: "Title is required" })}
            className="theme-input"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="theme-label">Short Description</label>
          <textarea
            placeholder="Brief details about your advertisement"
            {...register("description", {
              required: "Description is required",
            })}
            className="theme-input"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="theme-label">Promotional Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="theme-input"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit Advertisement"}
        </button>
      </form>
    </div>
  );
};

export default AddAdvertisement;
