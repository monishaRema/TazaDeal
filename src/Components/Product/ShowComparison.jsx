import React from "react";

import Comperison from "./Comperison";

const ShowComparison = ({ prices }) => {
  return (
    <div className="mt-8 bg-white p-5 md:p-8 rounded-md shadow-sm">
      <div className="heading-box max-w-2xl md:mx-auto md:text-center mb-10">
        <h2 className="sub-heading mb-2">Price Comparison</h2>
        <p className=" text-gray-600">
          Track how product prices have changed over time through a visual trend
          chart. Gain insights into daily market fluctuations based on
          historical data.
        </p>
      </div>

      <Comperison prices={prices}></Comperison>
    </div>
  );
};

export default ShowComparison;
