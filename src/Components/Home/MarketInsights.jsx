import { motion } from "framer-motion";
import { FaLightbulb, FaLeaf, FaChartLine, FaBullhorn } from "react-icons/fa";

const insights = [
  {
    icon: <FaLightbulb />,
    title: "Smart Shopping Tips",
    description:
      "Learn how to make informed buying decisions with expert-backed advice tailored for your local markets.",
  },
  {
    icon: <FaLeaf />,
    title: "Sustainable Choices",
    description:
      "Discover how to shop responsibly and support eco-friendly vendors across your community.",
  },
  {
    icon: <FaChartLine />,
    title: "Weekly Market Trends",
    description:
      "Stay updated on market shifts with weekly insights on fruit, vegetable, and meat pricing.",
  },
  {
    icon: <FaBullhorn />,
    title: "Buyer Awareness",
    description:
      "Understand vendor practices and pricing transparency so you always know what you're paying for.",
  },
];

const motionContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const motionCardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
};

const MarketInsights = () => {
  return (
    <motion.section
      className="relative bg-gray-100 py-24"
      variants={motionContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="container mx-auto px-5">
        {/* Header */}
        <motion.div
          className="md:text-center mb-10"
          variants={motionContainerVariants}
        >
          <motion.h2
            variants={motionCardVariants}
            className="text-3xl md:text-4xl font-bold text-accent mb-4"
          >
            Market Insights & Buyer Tips
          </motion.h2>
          <motion.p
            variants={motionCardVariants}
            className="max-w-2xl md:mx-auto sec-desc"
          >
            Stay ahead of the curve with expert articles, market trends, and
            vendor advice. Our blog brings clarity to everyday pricing, helping
            you shop smarter in your local markets.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={motionContainerVariants}
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              variants={motionCardVariants}
              className="border border-accent/30 rounded-xl px-6 py-8 hover:border-accent/80 transition-all duration-300"
            >
              <div className="text-accent text-6xl mb-4 flex">
                {insight.icon}
              </div>
              <h3 className="card-heading font-semibold text-accent mb-2">
                {insight.title}
              </h3>
              <p className="card-desc leading-normal">
                {insight.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MarketInsights;
