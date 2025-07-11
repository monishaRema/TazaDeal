import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Pagination from "../Components/UI/Pagination";
import SingleProduct from "../Components/Product/SingleProduct";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../Components/UI/LoadingSpinner";

const PRODUCTS_PER_PAGE = 12;

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-products", page, sortOrder, selectedDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: PRODUCTS_PER_PAGE,
      });

      if (sortOrder) params.append("sort", sortOrder);
      if (selectedDate) {
        params.append("date", selectedDate.toISOString().split("T")[0]);
      }

      const res = await axiosSecure.get(
        `/public/products?${params.toString()}`
      );
      return res.data;
    },
  });

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  return (
    <>
      <section className="bg-gray-100 py-15">
        <div className="container px-5 mx-auto text-center">
          <p className="mb-5">
            Home / <span className="text-primary font-bold">All Product</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Explore All Products
          </h1>
        </div>
      </section>
      <section className="all-product bg-secondary py-25">
        <div className="container mx-auto px-5">
          <div className="flex flex-col md:flex-row gap-5 justify-between mb-6 items-center">
            <div className="flex-1 flex gap-2 items-center">
              <label className="font-semibold mr-2">Sort by:</label>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="select select-bordered border-secondary outline-0 focus:outline-0 rounded-md"
              >
                <option value="">Default</option>
                <option value="asc">Price Low to High</option>
                <option value="desc">Price High to Low</option>
              </select>
            </div>

            <div className=" flex gap-2 items-center">
              <label className="font-semibold mr-2">Filter by Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setPage(1);
                }}
                className="input input-bordered input-sm"
                placeholderText="Select date"
                maxDate={new Date()}
                isClearable
              />
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : isError ? (
            <p className="text-red-500">Failed to fetch products.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.products?.map((product) => (
                  <SingleProduct key={product._id} product={product} />
                ))}
              </div>

              {data?.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    totalPages={data.totalPages}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
