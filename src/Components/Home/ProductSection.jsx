import React from 'react';
import { useQuery } from '@tanstack/react-query';

import LoadingSpinner from '../UI/LoadingSpinner';
import SingleProduct from '../Product/SingleProduct';
import useAxios from '../../Hooks/useAxios';

const ProductSection = () => {
  const axiosPublic = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['latest-approved-products'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/public/latest-products?limit=6');
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className='py-25'>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="heading mb-2">Latest Products</h2>
          <p className="sec-desc max-w-xl mx-auto">
           Discover fresh local updates from vendors. Products reflect the most recent market pricing, gathered directly from regional bazaars.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 && products.map(product => (
            <SingleProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
