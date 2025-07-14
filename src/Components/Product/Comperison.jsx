import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

const Comperison = ({ prices }) => {
  // Format and memoize price array
  const formattedPrices = useMemo(() => {
    return prices.map((entry) => ({
      ...entry,
      dateObj: new Date(entry.date),
      displayDate: format(new Date(entry.date), "MMM d"),
      label: format(new Date(entry.date), "MMM d"),
    }));
  }, [prices]);

  return (
    <div>
      {formattedPrices.length === 0 ? (
        <p className="text-sm text-gray-500">No data available to show.</p>
      ) : (
        <div className="">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedPrices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#14532d"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Comperison;
