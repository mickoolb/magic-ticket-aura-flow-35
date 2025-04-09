
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { events } from '@/data/events';

const featuredEvent = events[0];

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="mandala-bg w-[800px] h-[800px] top-[-400px] right-[-400px]"></div>
      <div className="mandala-bg w-[600px] h-[600px] bottom-[-300px] left-[-300px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-magic-light text-magic animate-pulse-soft">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Evento Especial en Chile</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-magic-dark leading-tight">
              Entre Diosas y{' '}
              <span className="bg-gradient-to-r from-magic to-magic-dark bg-clip-text text-transparent">
                Volcanes
              </span>
            </h1>
            
            <p className="text-lg text-magic-dark/80 max-w-lg">
              Un evento único con música, baile y karaoke en uno de los entornos naturales más hermosos de Chile. Compra tu boleto por solo $5,900.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="magic-button">
                <Link to="/buy?event=1">
                  Comprar Boleto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
                <Link to="/events/1">Ver Detalles</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-magic-light shadow-xl animate-float">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-magic-light to-white flex items-center justify-center">
              <img 
                src={featuredEvent.image}
                alt="Cascada de las Ánimas" 
                className="w-full h-full object-cover rounded-lg opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-magic-dark/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Entre Diosas y Volcanes</h3>
                  <p className="opacity-90">{featuredEvent.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
