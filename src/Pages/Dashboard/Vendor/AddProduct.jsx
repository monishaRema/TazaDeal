import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const AddProduct = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());

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

  const onSubmit = (data) => {
    const productData = {
      ...data,
      vendorEmail: user?.email,
      vendorName: user?.displayName || "",
      date: date.toISOString().split("T")[0],
      status: "pending",
      createdAt: new Date(),
    };

    console.log("Submitted product:", productData);
    // post to backend with axios
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Market Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label>Vendor Email (Read-only)</label>
          <input
            type="email"
            readOnly
            value={user?.email}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Vendor Name (Optional)</label>
          <input
            type="text"
            readOnly
            value={user?.displayName}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Market Name</label>
          <input
            {...register("marketName", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g., Karwan Bazar"
          />
          {errors.marketName && <p className="text-red-500">Required</p>}
        </div>

        <div>
          <label>Date</label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Market Description</label>
          <textarea
            {...register("marketDescription", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Details about market"
          />
        </div>

        <div>
          <label>Item Name</label>
          <input
            {...register("itemName", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g., Onion"
          />
        </div>

        <div>
          <label>Product Image URL</label>
          <input
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label>Price per Unit (e.g., ৳30/kg)</label>
          <input
            {...register("priceUnit", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g., ৳30/kg"
          />
        </div>

        <div>
          <label>Price and Date Log</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 mb-2">
              <input
                type="date"
                {...register(`prices.${index}.date`, { required: true })}
                className="input input-bordered"
              />
              <input
                type="number"
                {...register(`prices.${index}.price`, { required: true })}
                placeholder="৳ Price"
                className="input input-bordered"
              />
              <button type="button" onClick={() => remove(index)} className="btn btn-error">
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => append({ date: "", price: "" })}
          >
            + Add Price
          </button>
        </div>

        <div>
          <label>Item Description</label>
          <textarea
            {...register("itemDescription")}
            className="textarea textarea-bordered w-full"
            placeholder="Freshness, quality notes"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
