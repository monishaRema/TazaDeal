import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const blogSlides = [
  {
    id: 1,
    title: "Why Market Transparency Matters",
    description:
      "Explore how open pricing data empowers local farmers and consumers alike in modern marketplaces.",
    image:
      "https://www.gramerkagoj.com/uploads/article/2024/10/16/original/GK_2024-10-16_670fdf32304f8.jpg",
    link: "/blogs",
  },
  {
    id: 2,
    title: "Fresh Produce vs Supermarkets",
    description:
      "Discover the price and quality differences between local markets and big box retailers.",
    image:
      "https://uptimesbd.com/wp-content/uploads/2025/01/Nitto-Proyojoniyo-Drobbo.jpg",
    link: "/blogs",
  },
  {
    id: 3,
    title: "Tracking Price Trends with Data",
    description:
      "Learn how digital tools like TazaDeal make it easier to monitor changing product prices.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7CHPF5Y7oZl4YOHCUE8o9Wejx9BIRoI4BA&s",
    link: "/blogs",
  },
  {
    id: 4,
    title: "The Role of Vendors in Pricing",
    description:
      "Understand how vendors set prices daily based on local supply and demand conditions.",
    image: "https://i.ytimg.com/vi/v_5E1JkRdhc/maxresdefault.jpg",
    link: "/blogs",
  },
  {
    id: 5,
    title: "How to Read Market Signals",
    description:
      "Become a smarter buyer by interpreting seasonal shifts and trend signals from past data.",
    image: "https://i.ytimg.com/vi/Iu08emsuYrQ/hq720.jpg?",
    link: "/blogs",
  },
];

const BlogHighlights = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % blogSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToSlide = (index) => {
    setCurrent(index);
    setAutoPlay(false);
  };

  return (
    <section className="relative bg-gray-100 py-16">
      {/* Heading & Paragraph */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Market Insights & Buyer Tips
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Stay ahead of the curve with expert articles, market trends, and
          vendor advice. Our blog brings clarity to everyday pricing, helping
          you shop smarter in your local markets.
        </p>
      </div>

      {/* Slider */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${blogSlides[current].image})` }}
            />
            <div className="relative z-10 h-full flex items-center justify-center px-4 bg-black/50">
              <div className="text-center text-white max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {blogSlides[current].title}
                </h2>
                <p className="mb-5 text-white/90">{blogSlides[current].description}</p>
                <Link to={blogSlides[current].link} className="gradient-btn">
                  Read More
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {blogSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === current
                  ? "bg-yellow-400 scale-125"
                  : "bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
