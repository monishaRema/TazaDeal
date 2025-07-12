import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import Hero from "../Components/Header/Hero";
import { siteTitle } from "../Libs/Utility";
import ProductSection from "../Components/Home/ProductSection";
import AdvertisementHighlights from "../Components/Home/AdvertisementHighlights";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>{siteTitle} | Home</title>
      </Helmet>
      <Hero></Hero>
      <ProductSection></ProductSection>
      <AdvertisementHighlights></AdvertisementHighlights>
    </>
  );
};

export default Home;
