
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";


const MarketInsights = () => {




  return (
    <section className="relative bg-gray-100 py-25">
      <div className="container mx-auto px-5">

     
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

      </div>
    </section>
  );
};

export default MarketInsights;
