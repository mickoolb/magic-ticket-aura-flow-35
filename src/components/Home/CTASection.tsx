
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-purple p-8 md:p-12">
          <div className="mandala-bg w-[500px] h-[500px] opacity-20 top-[-150px] right-[-150px]"></div>
          <div className="mandala-bg w-[300px] h-[300px] opacity-20 bottom-[-100px] left-[-100px]"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vive tu próxima experiencia espiritual
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              No esperes más para transformar tu vida con los eventos que nutrirán tu alma.
              Compra tus boletos ahora y asegura tu lugar en estas experiencias únicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="magic-button-gold">
                <Link to="/buy">
                  Comprar Boletos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-colors">
                <Link to="/events">Ver Próximos Eventos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
