
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

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
              <span className="text-sm font-medium">Eventos Espirituales</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-magic-dark leading-tight">
              Experiencias mágicas con{' '}
              <span className="bg-gradient-to-r from-magic to-magic-dark bg-clip-text text-transparent">
                MagicTicket
              </span>
            </h1>
            
            <p className="text-lg text-magic-dark/80 max-w-lg">
              Tu portal hacia eventos espirituales transformadores. Compra boletos de manera segura y vive experiencias inolvidables.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="magic-button">
                <Link to="/buy">
                  Comprar Boletos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
                <Link to="/events">Ver Eventos</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-magic-light shadow-xl animate-float">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-magic-light to-white flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=600" 
                alt="Experiencia espiritual" 
                className="w-full h-full object-cover rounded-lg opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-magic-dark/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-2">Próximo Evento</h3>
                  <p className="opacity-90">Retiro de Meditación y Sanación - 25 Oct</p>
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
