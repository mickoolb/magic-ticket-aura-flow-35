
import React from 'react';
import Layout from '@/components/Layout/Layout';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import FeaturedEvents from '@/components/Home/FeaturedEvents';
import Testimonials from '@/components/Home/Testimonials';
import CTASection from '@/components/Home/CTASection';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedEvents />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
