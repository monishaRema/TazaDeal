import React from "react";
import { motion } from "framer-motion";
import {
  motionContainerVariants,
  motionCardVariants,
} from "../../Libs/Utility";

const testimonials = [
  {
    quote:
      "An absolute standout. Tools are robust and the buying flow is frictionless.",
    name: "Brendan Jonson",
    role: "CEO of Plantio",
  },
  {
    quote:
      "Remarkable solution with clean UI, reliable search, and fast checkout for busy teams.",
    name: "Wilson Jakson",
    role: "owner of Saan",
  },
  {
    quote:
      "Genuine innovation. Advanced vendor tools and smooth workflows that scale.",
    name: "Jonson Mayak",
    role: "Director of Deconec",
  },
  {
    quote:
      "Revolutionary for SMEs. Easy integrations and clear analytics that drive growth.",
    name: "Jacychan Jon",
    role: "Marketer",
  },
  {
    quote:
      "A real breakthrough. Next-gen features with efficient operations and uptime.",
    name: "Zak Willon",
    role: "Content Creator",
  },
  {
    quote:
      "Standout choice. Feature-rich, synced inventory, and practical UX for teams.",
    name: "Janney Jonson",
    role: "Writer",
  },
];

const Card = ({ quote, name, role }) => (
  <motion.div
    variants={motionContainerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    className="min-w-[320px] max-w-[360px] rounded-2xl bg-white/90 hover:bg-secondary transition-all duration-300 ease-in-out p-6 flex flex-col gap-4"
  >
    <motion.p
      variants={motionCardVariants}
      className="text-gray-700 leading-relaxed clamp-2"
    >
      “{quote}”
    </motion.p>
    <div>
      <motion.p
        variants={motionCardVariants}
        className="font-semibold text-gray-900"
      >
        {name}
      </motion.p>
      <motion.p variants={motionCardVariants} className="text-sm text-gray-500">
        {role}
      </motion.p>
    </div>
  </motion.div>
);

const Reviews = () => {
  const row = [...testimonials, ...testimonials];

  return (
    <motion.section
      className="testimonial-section relative py-24 bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(https://vegshops.vercel.app/assets/img/slider/bg.svg)`,
      }}
    >
      <div className="container mx-auto px-5">
        {/* Header */}
        <motion.div
          className="text-center mb-10 relative z-30"
          variants={motionContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h2
            variants={motionCardVariants}
            className="heading text-gray-800"
          >
            Hear From <span className="text-accent">Our Clients</span>
          </motion.h2>
          <motion.p
            variants={motionCardVariants}
            className="max-w-2xl mx-auto sec-desc"
          >
            Real stories from shoppers and vendors who trust TazaDeal. Discover
            how our platform makes buying and selling easier & smarter.
          </motion.p>
        </motion.div>
        <div className="testimonial-container relative">
          {/* Row 1 */}
          <div className="pause-on-hover overflow-hidden">
            <motion.div className="animate-marquee flex items-stretch gap-6">
              {row.map((t, i) => (
                <Card key={`r1-${i}`} {...t} />
              ))}
            </motion.div>
          </div>

          {/* Row 2 (reverse, slower) */}
          <div className="pause-on-hover overflow-hidden mt-6">
            <motion.div className="animate-marquee-reverse animate-marquee-slow flex items-stretch gap-6">
              {row.map((t, i) => (
                <Card key={`r2-${i}`} {...t} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Local CSS: marquee loop, hover pause, and 2-line clamp */}
      <style>{`
       .testimonial-section:before{
            content:"";
            width:40%;
            height:100%;
            position:absolute;
            top:0;
            left:-80px;
            background: linear-gradient(to right, rgba(202,215, 201, 0.89) 35%, transparent);
            z-index:2;
       }
      .testimonial-section:after{
            content:"";
            width:40%;
            height:100%;
            position:absolute;
            top:0;
            right:-80px;
            background: linear-gradient(to left, rgba(245,236, 218, 0.89) 65%, transparent);
            z-index:2;
       }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          will-change: transform;
        }
        .animate-marquee-slow {
          animation-duration: 45s;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 35s linear infinite;
          will-change: transform;
        }
        .pause-on-hover:hover .animate-marquee,
        .pause-on-hover:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
        .clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.section>
  );
};

export default Reviews;
