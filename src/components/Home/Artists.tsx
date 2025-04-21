
import React from 'react';
import { Music, Mic, Star } from 'lucide-react';

type Artist = {
  name: string;
  role: string;
  image: string;
  description: string;
};

// Artistas basados en el flyer proporcionado
const artists: Artist[] = [
  {
    name: "DJ Césil",
    role: "DJ Principal",
    image: "https://i.pravatar.cc/300?img=32",
    description: "Encargado de ambientar la ceremonia con ritmos envolventes que te transportarán a otro nivel."
  },
  {
    name: "Diosas Pélvicas",
    role: "Presentación Especial",
    image: "https://i.pravatar.cc/300?img=44",
    description: "Grupo de danza que conecta con la energía femenina a través de movimientos ancestrales."
  },
  {
    name: "Amar de Volcán",
    role: "Con Chami Gyal y Tsunami Cósmica",
    image: "https://i.pravatar.cc/300?img=45",
    description: "Experiencia musical que fusiona sonidos andinos con ritmos contemporáneos."
  },
  {
    name: "Nina Inti",
    role: "Presentación Especial",
    image: "https://i.pravatar.cc/300?img=57",
    description: "Artista que canaliza la energía del fuego sagrado a través de su música."
  },
  {
    name: "Euffepic",
    role: "Artista Invitada",
    image: "https://i.pravatar.cc/300?img=60",
    description: "Talento emergente que trae propuestas innovadoras a la escena."
  }
];

const Artists = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-magic-light/30 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-magic-light text-magic mb-4">
            <Music className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Vibrantes Shows en Vivo</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-magic-dark mb-4">
            Artistas Invitados
          </h2>
          <p className="text-magic-dark/70 max-w-2xl mx-auto">
            Disfruta de estas increíbles presentaciones durante la Ceremonia Ritual Ave Fénix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <div 
              key={index} 
              className="magic-card hover:translate-y-[-5px] bg-gradient-to-br from-white to-magic-light/20 backdrop-blur-sm"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg aspect-square">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-magic-dark/70 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{artist.name}</h3>
                    <div className="flex items-center">
                      {index === 0 ? (
                        <Music className="h-3.5 w-3.5 mr-1.5 text-magic-gold" />
                      ) : (
                        <Mic className="h-3.5 w-3.5 mr-1.5 text-magic-gold" />
                      )}
                      <p className="text-sm">{artist.role}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-magic-dark mb-1">{artist.name}</h3>
                  <p className="text-magic-dark/80 text-sm mb-3">{artist.role}</p>
                  <p className="text-magic-dark/70">{artist.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-purple rounded-xl p-6 text-center text-white shadow-lg">
          <Star className="h-8 w-8 mx-auto mb-3 text-magic-gold" />
          <h3 className="text-xl font-bold mb-2">Micrófono Abierto con Premio</h3>
          <p className="max-w-xl mx-auto">
            Participa en nuestra sesión de micrófono abierto y demuestra tu talento. 
            ¡El mejor acto será premiado al final del evento!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Artists;
