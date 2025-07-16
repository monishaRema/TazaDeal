import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { FaStoreAlt } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    title: "Explore Fresh Market Deals Daily",
    description:
      "Get real-time pricing from local vendors across your region. Stay informed and make smarter shopping decisions with up-to-date price insights.",
    image:
      "https://bhaskarlive.in/wp-content/uploads/Vegetable-Market.jpg",
    button_text: "View Products",
    button_link: "/all-products",
  },
  {
    id: 2,
    title: "Your Market, Your Prices",
    description:
      "Track item prices over time and compare market trends before making your next purchase. All from the convenience of your screen.",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/e0/78/39.jpg",
    button_text: "Start Tracking",
    button_link: "/all-products",
  },
  {
    id: 3,
    title: "Support Local Vendors",
    description:
      "Browse items directly from registered sellers in your city. Fair prices, transparent data, and a better shopping experience for all.",
    image:
      "https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2019/12/20/karwan_bazar_5.jpg",
    button_text: "Get Started",
    button_link: "/auth/register",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[500px] md:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="relative z-10 h-full flex items-center px-8 md:px-16 bg-gradient-to-b from-[#0c092580] to-[#00000080]">
            <div className="max-w-2xl text-white mx-auto flex flex-col text-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-4"
              >
                <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-base font-medium">
                  <FaStoreAlt className="w-4 h-4 mr-2" />
                  TazaDeal — Live Market Tracker
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg mb-8 text-white/80 leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex gap-4 justify-center"
              >
                <Link
                  to={slides[currentSlide].button_link}
                  className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition"
                >
                  {slides[currentSlide].button_text}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-lime-400 scale-125"
                : "bg-lime-700 hover:bg-lime-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
