
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { events } from '@/data/events';
import { ArrowRight, Ticket } from 'lucide-react';

const featuredEvent = events[0];

const Hero = () => {
  const availability = getTicketAvailability();
  const availableTickets = availability.available;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/58413378-f489-4e1a-be65-ea630318390c.png" 
          alt="Misty forest" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-purple-500/50 text-white mb-4">
            <span className="text-sm">Cascada de las Ánimas, Chile</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Entre </span>
            <span className="text-pink-500">Diosas </span>
            <span className="text-white">y </span>
            <br />
            <span className="text-pink-500">Volcanes</span>
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
            Vive una experiencia mágica con una combinación única de artistas invitados, 
            entretenimiento, danza, karaoke y conexión con la naturaleza.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-7 rounded-full border-none"
            >
              <Link to="/buy?event=1" className="flex items-center gap-2">
                Comprar Entrada
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full text-white flex items-center gap-2">
              <Ticket className="w-5 h-5 text-pink-300" />
              <span className="whitespace-nowrap">{availableTickets} de {TICKET_CONFIG.MAX_TICKETS} entradas disponibles</span>
            </div>
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-sm p-4 inline-flex items-center rounded-lg">
            <span className="text-white font-medium">Entrada general: 5.900 CLP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
