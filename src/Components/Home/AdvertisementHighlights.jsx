import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useAxios from '../../Hooks/useAxios';


const AdvertisementHighlights = () => {
  const axiosPublic = useAxios()

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['ads'],
    queryFn: async () => {
      const { data } = await axiosPublic.get('/public/ads');
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading ads...</div>;
  }

  if (ads.length === 0) {
    return <div className="text-center py-10">No active advertisements available.</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-5">
        <h2 className="text-xl font-semibold mb-6 text-center">Explore Promotions</h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          modules={[Pagination, Autoplay]}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <div className="bg-accent/10 border border-accent rounded-lg p-6 md:flex gap-6 items-center shadow-sm">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full max-w-xs rounded-lg object-cover"
                />
                <div className="mt-4 md:mt-0 md:flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{ad.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{ad.description}</p>
                  <p className="text-xs text-gray-500 mt-4">
                    — {ad.vendorName} ({ad.vendorEmail})
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AdvertisementHighlights;
