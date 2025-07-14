import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Comperison from "../../../Components/Product/Comperison";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner";

const PriceTrends = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trackedProducts"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users/tracked-products");
      return data;
    },
  });

  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load tracked products.</p>;

  return (
    <section>
      <div className="table-box-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Sidebar */}
          <aside className="md:col-span-1 ">
            <h3 className="sub-heading mb-5">Tracked Products</h3>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product._id}>
                  <button
                    className={`w-full text-left px-5 py-3 rounded-md font-medium text-sm border hover:border-accent/80 transition duration-500 ease-in-out flex gap-3 items-center ${
                      selectedProduct?._id === product._id
                        ? "bg-accent/20 border-accent"
                        : "border-accent/30"
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img src={product.image} alt={product.itemName} className="size-7 rounded-xs" /><span>{product.itemName}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Chart */}
          <div className="md:col-span-3">
            {selectedProduct ? (
              <div>
                <div className="mb-10 pl-0 md:pl-10">
                  <h2 className="text-2xl text-accent font-semibold mb-3 flex gap-2 items-center">
                     <img src={selectedProduct?.image} alt={selectedProduct?.itemName} className="size-7 rounded-xs"></img> {selectedProduct?.itemName}
                  </h2>
                  <p className="text-gray-600 text-sm">
                   <strong>Market : </strong>{selectedProduct.marketName} | <br />
                    <strong>Vendor : </strong> {selectedProduct.vendorName}
                  </p>
                </div>
                <Comperison prices={selectedProduct.prices} />
              </div>
            ) : (
              <p className="text-gray-500">
                No product selected or available for comparison.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceTrends;
