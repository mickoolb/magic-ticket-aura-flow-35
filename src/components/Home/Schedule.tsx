import React from 'react';
import { Clock, MapPin, Music, Star } from 'lucide-react';

type ScheduleItem = {
  time: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

const scheduleItems: ScheduleItem[] = [
  {
    time: "16:00",
    title: "Apertura de Puertas",
    description: "Recepción y bienvenida a los asistentes en Cascada de las Ánimas.",
    icon: MapPin
  },
  {
    time: "17:00",
    title: "DJ Césil",
    description: "Música envolvente para comenzar la noche con la mejor energía.",
    icon: Music
  },
  {
    time: "18:30",
    title: "Show en Vivo: Diosas Pélvicas",
    description: "Espectáculo que fusiona danza y música en una experiencia única.",
    icon: Music
  },
  {
    time: "20:00",
    title: "Micrófono Abierto",
    description: "¡Participa y muestra tu talento! El mejor acto recibirá un premio especial.",
    icon: Star
  },
  {
    time: "22:00",
    title: "Cierre del Evento",
    description: "Despedida y agradecimiento por compartir esta experiencia única.",
    icon: Clock
  }
];

const Schedule = () => {
  return (
    <section className="py-16 md:py-24 bg-magic-light/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-magic-light text-magic mb-4">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Programa del Día</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-magic-dark mb-4">
            Cronograma de Actividades
          </h2>
          <p className="text-magic-dark/70 max-w-2xl mx-auto">
            Sábado 17 de Mayo, 2025 • De 16:00 a 22:00 hrs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Línea del tiempo vertical */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-magic/30 transform md:translate-x-[-0.5px]"></div>
            
            <div className="space-y-12">
              {scheduleItems.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Punto en la línea de tiempo */}
                  <div className="absolute left-[-8px] md:left-1/2 top-0 w-4 h-4 rounded-full bg-magic shadow-md transform md:translate-x-[-8px]"></div>
                  
                  {/* Contenido */}
                  <div className="md:w-1/2"></div>
                  <div className="md:w-1/2 bg-white rounded-xl p-6 shadow-md border border-magic-light hover:shadow-lg transition-all duration-300 ml-6 md:ml-0">
                    <div className="flex items-center mb-3">
                      <div className="bg-magic-light rounded-full p-2 mr-3">
                        <item.icon className="h-5 w-5 text-magic" />
                      </div>
                      <div className="bg-magic text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {item.time} hrs
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-magic-dark mb-2">{item.title}</h3>
                    <p className="text-magic-dark/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
