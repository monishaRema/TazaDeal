
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Star, Users } from 'lucide-react';
import { Link } from 'react-router';

const slides = [
  {
    id: 1,
    title: "Discover Your Next Great Read",
    description: "Explore thousands of books across every genre, from thrilling mysteries to heartwarming romances, all in your personal virtual library.",
    image: "https://plus.unsplash.com/premium_photo-1749135102582-19927170462a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    button_text: 'Start Reading', 
    button_link: '/bookshelf'
},
  {
    id: 2,
    title: "Build Your Digital Library",

    description: "Keep track of books you've read, want to read, and currently reading. Create custom shelves and share recommendations with fellow book lovers.",
    image: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/18/2018/09/how-to-start-a-book-club-850x560.jpg",
   button_text: 'Add Book', 
    button_link: '/add-book'
},
  {
    id: 3,
    title: "Connect with Book Lovers",
    description: "Share reviews, join book clubs, and discover new authors through our vibrant community of readers who share your love for literature.",
    image: "https://img.freepik.com/free-photo/young-student-learning-library_23-2149215402.jpg?uid=R196871962&ga=GA1.1.1820641712.1742857839&semt=ais_hybrid&w=740",
    button_text: 'Get Started', 
    button_link: '/register'
}
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
      
          
          <div className="relative z-10 h-full flex items-center px-8 md:px-16 bg-gradient-to-b from-[#0c092560] to-[#12051d60] backdrop-blur-xs">
            <div className="max-w-2xl text-white mx-auto flex flex-col text-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4"
              >
                <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm md:text-base font-medium">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Virtual Bookshelf
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
                  className="gradient-btn">
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
                ? 'bg-violet-400 scale-125'
                : 'bg-violet-600 hover:bg-violet-500'
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;
