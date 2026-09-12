import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Divider from '../components/Divider';
import Sectors from '../components/Sectors';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="bg-gradient-red-to-white h-24 w-full -mt-1 relative z-10" aria-hidden="true" />
      <Services />
      <Divider />
      <Sectors />
      <Pricing />
      <Testimonials />
      <Contact />
    </>
  );
}
