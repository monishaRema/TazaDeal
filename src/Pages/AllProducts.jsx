import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Pagination from "../Components/UI/Pagination";
import SingleProduct from "../Components/Product/SingleProduct";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import NoItemsFound from "../Components/UI/NoItemsFound";
import PageHeader from "../Components/Common/PageHeader";
import { motion } from "framer-motion";
import { motionContainerVariants, motionCardVariants, siteTitle } from "../Libs/Utility";
import { Helmet } from "@dr.pogodin/react-helmet";

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
      <PageHeader pageTitle="Explore All Products" presentPage="All Product" />

      <section className="all-product bg-secondary py-25">
        <Helmet>
        <title>{siteTitle} | All Product</title>
      </Helmet>
        <motion.div className="container mx-auto px-5">
          {/* Filter Controls */}
          <motion.div
            className="flex flex-col md:flex-row gap-5 justify-between mb-6 items-start md:items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={motionContainerVariants}
          >
            <motion.div
              variants={motionCardVariants}
              className="flex gap-2 items-center w-full md:max-w-md"
            >
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
            </motion.div>

            <motion.div
              variants={motionCardVariants}
              className="flex gap-2 items-center w-full md:max-w-xs"
            >
              <label className="font-semibold mr-2">Filter by Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setPage(1);
                }}
                className="input input-bordered input-sm foucus:outline-0 focus:border-accent w-full"
                placeholderText="Select date"
                maxDate={new Date()}
                isClearable
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <p className="text-red-500">Failed to fetch products.</p>
          ) : (
            <>
              {data?.products.length <= 0 && <NoItemsFound items="product" />}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.products?.map((product) => (
                  <SingleProduct key={product._id} product={product} />
                ))}
              </motion.div>

              {data?.totalPages > 1 && (
                <motion.div className="mt-8" variants={motionCardVariants}>
                  <Pagination
                    totalPages={data.totalPages}
                    page={page}
                    setPage={setPage}
                  />
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </section>
    </>
  );
};

export default AllProducts;
