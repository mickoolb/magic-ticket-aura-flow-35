
import React from 'react';
import { Flame, Moon, Sun, Star } from 'lucide-react';

const Ceremony = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full border-2 border-magic animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[200px] h-[200px] rounded-full border border-magic-gold animate-pulse-soft delay-300"></div>
        <Moon className="absolute top-1/4 left-1/5 w-12 h-12 text-magic-gold/30 animate-float" />
        <Sun className="absolute bottom-1/4 right-1/5 w-16 h-16 text-magic/30 animate-float delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-magic-light text-magic mb-4">
            <Flame className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Experiencia Espiritual</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-magic-dark mb-4">
            Ceremonia Ritual Ave Fénix
          </h2>
          <p className="text-magic-dark/70 max-w-2xl mx-auto">
            Una poderosa ceremonia de transformación y renacimiento espiritual en la majestuosa Cascada de las Ánimas
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-magic-light">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-magic-dark mb-4">Renace de las Cenizas</h3>
              <p className="text-magic-dark/80 mb-6">
                La Ceremonia Ritual Ave Fénix es una experiencia transformadora diseñada para ayudarte a liberarte de lo que ya no te sirve y renacer con nueva energía y propósito.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-magic-light rounded-full p-2 mt-1 mr-4">
                    <Flame className="h-5 w-5 text-magic" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-magic-dark">Limpieza Energética</h4>
                    <p className="text-magic-dark/70">Rituales para liberar bloqueos y energías estancadas.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-magic-light rounded-full p-2 mt-1 mr-4">
                    <Moon className="h-5 w-5 text-magic" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-magic-dark">Conexión con lo Divino Femenino</h4>
                    <p className="text-magic-dark/70">Activación de la energía creadora y receptiva.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-magic-light rounded-full p-2 mt-1 mr-4">
                    <Star className="h-5 w-5 text-magic" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-magic-dark">Manifestación Consciente</h4>
                    <p className="text-magic-dark/70">Herramientas para materializar tus sueños y deseos más profundos.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=600" 
                alt="Ceremonia Ritual" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-magic-dark/50 to-transparent flex items-center">
                <div className="text-white p-8">
                  <h3 className="text-xl font-bold mb-2">En armonía con la naturaleza</h3>
                  <p className="text-white/80">
                    La poderosa energía de las montañas y el agua potencian esta ceremonia única.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ceremony;
