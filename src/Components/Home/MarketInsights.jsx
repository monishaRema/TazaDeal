import { motion } from "framer-motion";
import { FaLightbulb, FaLeaf, FaChartLine, FaBullhorn } from "react-icons/fa";
import {
  motionContainerVariants,
  motionCardVariants,
} from "../../Libs/Utility";
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

const MarketInsights = () => {
  return (
    <motion.section className="relative py-24">
      <div className="container mx-auto px-5">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          variants={motionContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h2
            variants={motionCardVariants}
            className="heading text-accent"
          >
            Market Insights & <span className="text-gray-800"> Buyer Tips</span>
          </motion.h2>
          <motion.p
            variants={motionCardVariants}
            className="max-w-2xl mx-auto sec-desc"
          >
            Stay ahead with articles, market trends, and vendor advice. Our blog
            brings clarity to everyday pricing, helping you shop smarter.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              variants={motionContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              key={index}
              className="border border-accent/30 rounded-xl px-6 py-8 hover:border-accent/80 transition-all duration-300 text-center sm:text-start"
            >
              <motion.div
                variants={motionCardVariants}
                className="text-accent text-6xl mb-4 flex justify-center sm:justify-start"
              >
                {insight.icon}
              </motion.div>
              <motion.h3
                variants={motionCardVariants}
                className="card-heading font-semibold text-accent mb-2"
              >
                {insight.title}
              </motion.h3>
              <motion.p
                variants={motionCardVariants}
                className="card-desc leading-normal"
              >
                {insight.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MarketInsights;
