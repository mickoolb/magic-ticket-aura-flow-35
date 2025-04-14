
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import FeaturedEvents from '@/components/Home/FeaturedEvents';
import Testimonials from '@/components/Home/Testimonials';
import CTASection from '@/components/Home/CTASection';
import { getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { Progress } from '@/components/ui/progress';
import { Ticket, AlertCircle } from 'lucide-react';

const Index = () => {
  const [availability, setAvailability] = useState(getTicketAvailability());
  
  // Update availability every time the component is shown
  useEffect(() => {
    setAvailability(getTicketAvailability());
    
    // Optional: Set up periodic refresh
    const interval = setInterval(() => {
      setAvailability(getTicketAvailability());
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const availabilityPercentage = (availability.available / TICKET_CONFIG.MAX_TICKETS) * 100;
  
  return (
    <Layout>
      <Hero />
      
      {/* Ticket Availability Section - Moved to a more appropriate position with proper spacing */}
      <div className="bg-magic-light/10 py-12 mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-magic-light/30 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Ticket className="h-6 w-6 text-magic" />
                <h3 className="text-xl font-semibold text-magic-dark">Disponibilidad de Boletos</h3>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 flex items-center gap-2">
                <span className="text-xl font-bold text-blue-700">{availability.available}</span>
                <span className="text-blue-700 text-sm">disponibles</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-magic-dark/70">Boletos disponibles:</span>
                <span className="font-semibold">{availability.available} de {TICKET_CONFIG.MAX_TICKETS}</span>
              </div>
              <Progress value={availabilityPercentage} className="h-3 bg-gray-100" />
            </div>
            
            {availability.available < 20 && (
              <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <p>¡Apresúrate! Quedan pocos boletos disponibles para nuestros eventos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <FeaturedEvents />
      <Testimonials />
      <CTASection />
      <Features />
    </Layout>
  );
};

export default Index;
