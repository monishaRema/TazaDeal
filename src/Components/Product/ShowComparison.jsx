import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ShowToast from '../UI/ShowToast';

const ShowComparison = ({ productId, prices }) => {
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState('');

  const { data: pastData, isLoading } = useQuery({
    queryKey: ['priceComparison', productId, selectedDate],
    enabled: !!productId && !!selectedDate,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users/product/${productId}/compare?date=${selectedDate}`
      );
      return data?.prices || [];
    },
    onError: () => {
      ShowToast('error', 'Failed to fetch comparison data');
    },
  });

  const currentData = prices.map((p) => ({
    ...p,
    date: format(new Date(p.date), 'MMM d'),
  }));

  const historicalData = pastData?.map((p) => ({
    ...p,
    date: format(new Date(p.date), 'MMM d'),
  })) || [];

  const combinedData = [...historicalData, ...currentData];

  return (
    <div className="mt-8 bg-white p-5 md:p-8 rounded-md shadow-sm">
      <h2 className="sub-heading mb-5  pb-5 border-b border-accent/20"> Price Comparison</h2>

      

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : combinedData.length === 0 ? (
        <p className="text-sm text-gray-500">No data available for this date.</p>
      ) : (
        <div className='py-5 border-b border-accent/20'>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#146131"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-5 items-center  mt-5">
        <label className="block text-lg font-medium">Compare with date</label>
        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ShowComparison;
