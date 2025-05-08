import React from 'react'
import Hero from './Components/Hero'
import DealsMonth from './Components/DealsMonth'
import NewArrivals from './Components/new-arrivals'

const Home = () => {
  return (
    <div>
      <Hero/>
      <DealsMonth/>
      <NewArrivals/>
    </div>
  )
}

export default Home