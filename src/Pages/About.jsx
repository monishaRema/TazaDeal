import React from "react";
import Newsletter from "../Components/Home/Newsletter";
import WhyTrustUs from "../Components/Home/WhyTrustUs ";

const About = () => {
  return (
    <>
    <section className="min-h-screen bg-white text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-6">About TazaDeal</h1>
        <p className="text-lg mb-6 leading-relaxed text-gray-700">
          <span className="font-semibold text-accent">TazaDeal</span> is your trusted marketplace for fresh fruits,
          vegetables, meat, dairy, and everyday essentials — sourced locally and delivered quickly. We aim to connect
          buyers with verified vendors offering real-time market pricing, ensuring transparency and trust in every transaction.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-3">🌱 What Makes Us Different</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Real-time price tracking powered by vendors and buyers</li>
              <li>Verified vendors, reviewed by real users</li>
              <li>Fresh produce, directly from local markets</li>
              <li>Secure payments and buyer protection</li>
              <li>Community-driven platform with reviews, trends, and feedback</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-3">🚚 Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in empowering communities by giving access to transparent pricing, quality food, and trusted local businesses.
              With TazaDeal, you're not just buying groceries — you're making informed, sustainable, and budget-friendly choices.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-primary mb-3">🤝 Join the Movement</h2>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a buyer looking for the best deals or a vendor wanting to reach more customers, TazaDeal
            is built for you. Together, we can simplify local shopping and build trust in every purchase.
          </p>
        </div>
      </div>
    </section>
    <WhyTrustUs></WhyTrustUs>
    <Newsletter></Newsletter>
</>
  );
};

export default About;
