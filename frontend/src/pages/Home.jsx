import React from "react";
import OfferCard from "../components/section/OfferCard";
import Benifites from "../components/section/Benifites";
import TopPicks from "../components/section/TopPicks";
import ShopByCat from "../components/section/ShopByCat";
import ShopByConcern from "../components/section/ShopByConcern";
import Reviews from "../components/section/Reviews";
import Blog from "../components/section/Blog";
import Trusted from "../components/section/Trusted";
import Footer from "../components/section/Footer";
import VideoSection from "../components/section/VideoSection";

const Home = () => {
  return (
    <div>
      <OfferCard />
      <Benifites />
      <TopPicks />
      <ShopByCat />
      <ShopByConcern />
      <Reviews />
      <VideoSection />
      <Blog />
      <Trusted />
      <Footer />
    </div>
  );
};

export default Home;
