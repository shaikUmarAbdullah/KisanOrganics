import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Features from '../Components/Features/Features'
import Topcategory from '../Components/Topcategory/Topcategory'
import CcHero from '../Components/CcHero/CcHero'
import BlogList from '../Components/BlogList/BlogList'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CcHero/>
      <Popular/>
      <Topcategory/>
      <BlogList/>
      <Features/>
    </div>
  )
}

export default Home