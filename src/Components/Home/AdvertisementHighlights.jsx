import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import {
  motionContainerVariants,
  motionCardVariants,
} from "../../Libs/Utility";

const AdvertisementHighlights = () => {
  const axiosPublic = useAxios();

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/public/ads");
      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading ads...</div>;
  }

  if (ads.length === 0) {
    return (
      <div className="text-center py-10">
        No active advertisements available.
      </div>
    );
  }

  return (
    <motion.section className="py-25">
      <div className="container mx-auto px-5">
        <motion.div
          variants={motionContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h2
            className="heading text-center"
            variants={motionCardVariants}
          >
            <span className="text-primary">Ongoing</span> Promotions
          </motion.h2>
          <motion.p
            className="sec-desc max-w-2xl mx-auto text-center"
            variants={motionCardVariants}
          >
            Discover unbeatable daily deals and market-exclusive offers from
            verified vendors. Each promotion ensures freshness, affordability,
            availability.
          </motion.p>
        </motion.div>

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
              <motion.div
                variants={motionContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                className="max-w-6xl mx-auto rounded-3xl p-6 md:p-10 relative gap-5 flex flex-col-reverse md:flex-row items-center shadow-md overflow-hidden border-0"
                style={{
                  backgroundImage: `url(https://vegshops.vercel.app/assets/img/slider/bg.svg)`,
                }}
              >
                {/* Left Text Content */}
                <motion.div className="w-full md:w-7/12 text-center md:text-left z-10 ads-contant">
                  <motion.h3
                    variants={motionCardVariants}
                    className="sub-heading text-primary"
                  >
                    {ad.title}
                  </motion.h3>
                  <motion.p
                    variants={motionCardVariants}
                    className="text-gray-700 mt-3"
                  >
                    {ad.description}
                  </motion.p>
                  <motion.p
                    variants={motionCardVariants}
                    className="text-sm text-gray-500 mt-4"
                  >
                    By : <strong>{ad.vendorName}</strong>
                  </motion.p>
                </motion.div>

                {/* Right Image */}
                <div className="w-full md:w-5/12">
                  <motion.img
                    variants={motionCardVariants}
                    src={ad.image}
                    alt={ad.title}
                    className="w-full max-h-[300px] object-cover rounded-xl"
                  ></motion.img>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default AdvertisementHighlights;
