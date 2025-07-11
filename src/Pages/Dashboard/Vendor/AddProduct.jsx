import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ShowToast from "../../../Components/UI/ShowToast";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [{ date: "", price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const { mutate: addProduct, isLoading } = useMutation({
    mutationFn: async (productData) => {
      const res = await axiosSecure.post("/vendor/add-product", productData);
      return res.data;
    },
    onSuccess: () => {
      ShowToast("success", "Product submitted for review");
      reset();
      navigate('/dashboard/my-products')
      queryClient.invalidateQueries(["vendorProducts"]);
      
    },
    onError: (err) => {

      ShowToast("error", err?.response?.data?.message || "Failed to submit product");
    },
  });

  const onSubmit = (data) => {
    const productData = {
      ...data,
      vendorEmail: user?.email,
      vendorName: user?.displayName || "",
       priceUnit: parseInt(data.priceUnit),
      prices: data.prices.map((entry) => ({
        price: parseInt(entry.price),
        date: new Date(entry.date),
      })),
      date: date,
    };
    addProduct(productData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow bg-white rounded-lg">
      <h2 className="sub-heading mb-5">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Vendor Info */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="theme-label">Vendor Email</label>
            <input
              type="email"
              readOnly
              tabIndex={-1}
              value={user?.email}
              className="theme-input cursor-not-allowed bg-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="theme-label">Vendor Name</label>
            <input
              type="text"
              readOnly
              tabIndex={-1}
              value={user?.displayName}
              className="theme-input cursor-not-allowed bg-gray-100"
            />
          </div>
        </div>

        {/* Market Name */}
        <div>
          <label className="theme-label">Market Name</label>
          <input
            type="text"
            {...register("marketName", { required: true })}
            className="theme-input"
            placeholder="e.g., Karwan Bazar"
          />
          {errors.marketName && (
            <p className="text-red-500 text-sm">Market name is required</p>
          )}
        </div>

        {/* Market Description */}
        <div>
          <label className="theme-label">Market Description</label>
          <textarea
            {...register("marketDescription", { required: true })}
            className="theme-input"
            placeholder="Location, established year, notable info..."
          />
          {errors.marketDescription && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Item Name & Unit Price */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="theme-label">Item Name</label>
            <input
              type="text"
              {...register("itemName", { required: true })}
              className="theme-input"
              placeholder="e.g., Onion"
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm">Item name is required</p>
            )}
          </div>
          <div className="flex-1">
            <label className="theme-label">Price per Unit</label>
            <input
              type="number"
              {...register("priceUnit", { required: true })}
              className="theme-input"
              placeholder="e.g : ৳30/kg"
            />
            {errors.priceUnit && (
              <p className="text-red-500 text-sm">Unit price is required</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Image URL */}
          <div className="flex-1">
            <label className="theme-label">Product Image URL</label>
            <input
              type="url"
              {...register("image", { required: true })}
              className="theme-input"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">Image URL is required</p>
            )}
          </div>
          {/* Product Category */}
          <div className="flex-1">
            <label className="theme-label">Product Category</label>
            <input
              type="text"
              {...register("category", { required: true })}
              className="theme-input"
              placeholder="e.g., Vegetable"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">Category is required</p>
            )}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="theme-label">Date</label>
          <br />
          <div className="w-full">
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="theme-input w-full block"
            />
          </div>
        </div>

        {/* Price History */}
        <div>
          <label className="theme-label">Price History</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <input
                type="date"
                {...register(`prices.${index}.date`, { required: true })}
                className="theme-input"
              />
              <input
                type="number"
                {...register(`prices.${index}.price`, { required: true })}
                placeholder="৳ Price"
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
            onClick={() => append({ date: "", price: "" })}
          >
            + Add Price
          </button>
        </div>

        {/* Description */}
        <div>
          <label className="theme-label">Item Description</label>
          <textarea
            {...register("itemDescription")}
            className="theme-input"
            placeholder="Freshness, quality notes (optional)"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
