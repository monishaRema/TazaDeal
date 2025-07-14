import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useAxios from '../../Hooks/useAxios';

const AdvertisementHighlights = () => {
  const axiosPublic = useAxios();

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
    <section className="py-25">
      <div className="container mx-auto px-5">
        <h2 className="heading text-primary text-center">
          Ongoing Promotions
        </h2>
        <p className="sec-desc max-w-2xl mx-auto text-center">
          Discover unbeatable daily deals and market-exclusive offers from verified vendors.
Each promotion is curated to ensure freshness, affordability, and local availability.

        </p>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          modules={[Pagination, Autoplay]}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad._id}>
              <div className="max-w-6xl mx-auto rounded-3xl p-6 md:p-10 relative gap-5 flex flex-col-reverse md:flex-row items-center shadow-md overflow-hidden border-0"
              style={{backgroundImage:`url(https://vegshops.vercel.app/assets/img/slider/bg.svg)`}}
              >
                
                {/* Left Text Content */}
                <div className="w-full md:w-7/12 text-center md:text-left  ads-contant z-10 ">
                  <h3 className="sub-heading text-primary">{ad.title}</h3>
                  <p className="text-gray-700 mt-3">{ad.description}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    By : <strong>{ad.vendorName}</strong>
                  </p>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-5/12">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full max-h-[300px] object-cover rounded-xl"
                  />
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

