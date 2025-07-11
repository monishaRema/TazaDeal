import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ShowToast from "../../../Components/UI/ShowToast";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";

const UpdateAdvertisement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch ad data
  const { data: ad, isLoading } = useQuery({
    queryKey: ["ad", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor/ads/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (ad) {
      if (ad.vendorEmail !== user?.email) {
        ShowToast("error", "You are not authorized to edit this ad");
        return navigate("/dashboard/my-advertisements");
      }

      reset({
        title: ad.title,
        description: ad.description,
        image: ad.image,
      });
    }
  }, [ad, reset, navigate, user]);

  // Update mutation
  const { mutate: updateAd, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosSecure.patch(`/vendor/update-ads/${id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["vendorAds"]);
      ShowToast("success", "Ad updated successfully");
      navigate("/dashboard/my-advertisements");
    },
    onError: () => {
      ShowToast("error", "Failed to update ad");
    },
  });

  const onSubmit = async (data) => {
    try {
      let imageUrl = ad.image; // default to existing image

      const newImage = data?.image?.[0];

      if (newImage && newImage instanceof File && newImage.size > 0) {
        setUploading(true);

        const formData = new FormData();
        formData.append("image", newImage);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
          formData
        );

        if (res?.data?.data?.url) {
          imageUrl = res.data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      updateAd({
        title: data.title.trim(),
        description: data.description.trim(),
        image: imageUrl,
      });
    } catch (err) {
      console.error(err);
      ShowToast("error", "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto p-6 shadow bg-white rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Update Advertisement
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <img
          src={ad.image}
          alt={ad.title}
          className="h-60 w-full rounded-md mb-5 object-cover"
        />
        {/* Title */}
        <div>
          <label className="theme-label">Ad Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="theme-input"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="theme-label">Short Description</label>
          <textarea
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
            {...register("image")}
            className="theme-input"
          />
          <p className="text-sm text-gray-500">
            Leave empty to keep existing image.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={uploading || isUpdating}
        >
          {uploading || isUpdating ? "Updating..." : "Update Advertisement"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAdvertisement;
