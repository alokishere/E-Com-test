import React from "react";
import Navbar from "../components/Navbar";
import OfferCard from "../components/section/OfferCard";
import Benifites from "../components/section/Benifites";
import ShopByCat from "../components/section/ShopByCat";
import ShopByConcern from "../components/section/ShopByConcern";
import Blog from "../components/section/Blog";
import Trusted from "../components/section/Trusted";
import Footer from "../components/section/Footer";
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <Navbar />
      <OfferCard />
      <Benifites />
      <Products />
      <ShopByCat />
      <ShopByConcern />
      <Blog />
      <Trusted />
      <Footer />
    </div>
  );
};

export default Home;
