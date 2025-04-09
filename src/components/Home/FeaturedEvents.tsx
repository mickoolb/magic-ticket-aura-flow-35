
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { events } from '@/data/events';

// Use the single event from our data
const featuredEvent = events[0];

const FeaturedEvents = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white to-magic-light/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-magic-dark mb-4">
            Evento Especial
          </h2>
          <p className="text-magic-dark/70 max-w-2xl mx-auto">
            No te pierdas "Entre Diosas y Volcanes", un evento único con música, baile y karaoke en un entorno natural espectacular
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-white rounded-xl overflow-hidden shadow-md border border-magic-light hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img 
                src={featuredEvent.image} 
                alt={featuredEvent.title} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 right-0 bg-magic text-white text-sm font-medium px-3 py-1 rounded-bl-lg">
                {featuredEvent.date}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-magic-dark mb-2">{featuredEvent.title}</h3>
              <p className="text-magic-dark/70 mb-4">{featuredEvent.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-magic-dark/80">
                  <Calendar className="h-4 w-4 mr-2 text-magic" />
                  <span>{featuredEvent.date} • {featuredEvent.time}</span>
                </div>
                <div className="flex items-center text-sm text-magic-dark/80">
                  <MapPin className="h-4 w-4 mr-2 text-magic" />
                  <span>{featuredEvent.location}, {featuredEvent.address}</span>
                </div>
                <div className="flex items-center text-sm text-magic-dark/80">
                  <Users className="h-4 w-4 mr-2 text-magic" />
                  <span>{featuredEvent.instructor}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-magic">
                  ${featuredEvent.price.toLocaleString()}
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
                    <Link to={`/events/${featuredEvent.id}`}>
                      Ver Detalles
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild className="magic-button">
                    <Link to={`/buy?event=${featuredEvent.id}`}>
                      Comprar
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
            <Link to="/events">
              Más Información
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
