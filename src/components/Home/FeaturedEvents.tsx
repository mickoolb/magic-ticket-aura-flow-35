
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for featured events
const featuredEvents = [
  {
    id: 1,
    title: 'Retiro de Meditación y Sanación',
    date: '25 Oct 2025',
    location: 'Centro de Paz Interior',
    instructor: 'Maestra Luna',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600',
    description: 'Un fin de semana para reconectar con tu esencia y sanar tu espíritu.'
  },
  {
    id: 2,
    title: 'Ceremonia de Luna Llena',
    date: '10 Nov 2025',
    location: 'Jardín Celestial',
    instructor: 'Sabio Estelar',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600',
    description: 'Ritual para manifestar propósitos y limpiar energías bajo la luz de la luna llena.'
  },
  {
    id: 3,
    title: 'Taller de Cristales y Energía',
    date: '15 Dec 2025',
    location: 'Centro Armónico',
    instructor: 'Cristal de Luz',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600',
    description: 'Aprende a utilizar la energía de los cristales para armonizar tu vida.'
  }
];

const FeaturedEvents = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white to-magic-light/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-magic-dark mb-4">
            Próximos Eventos Especiales
          </h2>
          <p className="text-magic-dark/70 max-w-2xl mx-auto">
            Descubre experiencias transformadoras que elevarán tu conciencia y nutrirán tu espíritu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md border border-magic-light hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-magic text-white text-sm font-medium px-3 py-1 rounded-bl-lg">
                  {event.date}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-magic-dark mb-2">{event.title}</h3>
                <p className="text-magic-dark/70 mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-magic-dark/80">
                    <Calendar className="h-4 w-4 mr-2 text-magic" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-magic-dark/80">
                    <MapPin className="h-4 w-4 mr-2 text-magic" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-magic-dark/80">
                    <Users className="h-4 w-4 mr-2 text-magic" />
                    <span>{event.instructor}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
                    <Link to={`/events/${event.id}`}>
                      Ver Detalles
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild className="magic-button">
                    <Link to={`/buy?event=${event.id}`}>
                      Comprar
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
            <Link to="/events">
              Ver Todos los Eventos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
