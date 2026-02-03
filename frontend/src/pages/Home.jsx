import React from 'react'
import Navbar from '../components/Navbar'
import FloatingItems from '../components/section/FloatingItems'
import OfferCard from '../components/section/OfferCard'

const Home = () => {
  return (
    <div>
        <Navbar />
        <FloatingItems />
        <OfferCard/>
    </div>
  )
}

export default Home