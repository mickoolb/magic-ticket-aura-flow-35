
import React from 'react';
import Layout from '@/components/Layout/Layout';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import FeaturedEvents from '@/components/Home/FeaturedEvents';
import Testimonials from '@/components/Home/Testimonials';
import CTASection from '@/components/Home/CTASection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedEvents />
      <Testimonials />
      <CTASection />
      <Features />
    </Layout>
  );
};

export default Index;
