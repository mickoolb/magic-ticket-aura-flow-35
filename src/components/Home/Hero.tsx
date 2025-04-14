
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { events } from '@/data/events';

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
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-purple-500/50 text-white mb-4">
            <span className="text-sm">Cascada de las Ánimas, Chile</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-white">Entre </span>
            <span className="text-pink-500">Diosas </span>
            <span className="text-white">y </span>
            <br />
            <span className="text-pink-500">Volcanes</span>
          </h1>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl">
            Vive una experiencia mágica con una combinación única de artistas invitados, entretenimiento, danza, karaoke y conexión con la naturaleza.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-6 rounded-full">
              <Link to="/buy?event=1">
                Comprar Entrada
              </Link>
            </Button>
            
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
              <span className="whitespace-nowrap">{availableTickets} de {TICKET_CONFIG.MAX_TICKETS} entradas disponibles</span>
            </div>
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-sm p-3 inline-flex items-center rounded-lg">
            <span className="text-white">Entrada general: 5.900 CLP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
