import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";
import ShowToast from "../../../Components/UI/ShowToast";
import useUserData from "../../../Hooks/useUserData";
import useAuth from "../../../Hooks/useAuth";

import { siteTitle } from "../../../Libs/Utility";
import { Helmet } from "@dr.pogodin/react-helmet";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { userInfo } = useUserData();
  const [date, setDate] = useState(new Date());

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor/product/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        prices: product.prices?.length
          ? product.prices.map((p) => ({
              ...p,
              date: new Date(p.date),
            }))
          : [{ date: new Date(), price: "" }],
      });
      setDate(new Date(product.date));
    }
  }, [product, reset]);

  useEffect(() => {
    if (!product || !user) return;

    const isOwner =
      user?.email?.toLowerCase().trim() ===
      product?.vendorEmail?.toLowerCase().trim();
    const isAdmin = userInfo?.role === "admin";

    if (!isOwner && !isAdmin) {
      ShowToast("error", "You are not authorized to edit this product");
      navigate("/dashboard");
    }
  }, [product, user, userInfo.role, navigate]);

  const { mutate: updateProduct, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
      const { data } = await axiosSecure.patch(`/vendor/update-product/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      ShowToast("success", "Product updated");
      queryClient.invalidateQueries(["myProducts"]);
      if (userInfo.role === "vendor") {
        navigate("/dashboard/my-products");
      } else if (userInfo.role === "admin") {
        navigate("/dashboard/manage-products");
      }
    },
    onError: () => {
      ShowToast("error", "Update failed");
    },
  });

  const onSubmit = (formData) => {
    const updatedData = {
      ...formData,
      priceUnit: parseInt(formData.priceUnit),
      date: date,
      prices: formData.prices.map((entry) => ({
        price: parseInt(entry.price),
        date: new Date(entry.date),
      })),
    };
    updateProduct(updatedData);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError || !product)
    return (
      <p className="text-red-500 bg-white p-5 rounded">Product not found</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 shadow bg-white rounded-lg">
      <Helmet>
        <title>{siteTitle} | Vendor: Ads</title>
      </Helmet>
      <h2 className="sub-heading mb-5">
        Update Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="theme-label">Market Name</label>
            <input
              type="text"
              {...register("marketName", { required: "Market name is required" })}
              className="theme-input"
            />
            {errors.marketName && (
              <p className="text-red-500 text-sm">{errors.marketName.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="theme-label">Category</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="theme-input"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="theme-label">Market Description</label>
          <textarea
            {...register("marketDescription", {
              required: "Market description is required",
            })}
            className="theme-input"
          />
          {errors.marketDescription && (
            <p className="text-red-500 text-sm">
              {errors.marketDescription.message}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="theme-label">Item Name</label>
            <input
              type="text"
              {...register("itemName", { required: "Item name is required" })}
              className="theme-input"
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm">{errors.itemName.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="theme-label">Price per Unit</label>
            <input
              type="number"
              {...register("priceUnit", {
                required: "Price per unit is required",
              })}
              className="theme-input"
            />
            {errors.priceUnit && (
              <p className="text-red-500 text-sm">{errors.priceUnit.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="theme-label">Product Image URL</label>
            <input
              type="url"
              {...register("image", { required: "Image URL is required" })}
              className="theme-input"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="theme-label">Created Date</label>
            <br />
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="theme-input w-full"
            />
          </div>
        </div>

        <div>
          <label className="theme-label">Price History</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <Controller
                control={control}
                name={`prices.${index}.date`}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="theme-input"
                  />
                )}
              />
              <input
                type="number"
                {...register(`prices.${index}.price`, {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                className="theme-input"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-sm btn-error"
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline btn-sm mt-2"
            onClick={() => append({ date: new Date(), price: "" })}
          >
            + Add Price
          </button>
        </div>

        <div>
          <label className="theme-label">Item Description</label>
          <textarea {...register("itemDescription")} className="theme-input" />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="btn btn-primary w-full"
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
