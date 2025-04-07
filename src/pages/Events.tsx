
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { events, Event } from '@/data/events';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  Search, 
  ArrowRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(
    new Set(events.flatMap(event => event.tags))
  );

  // Filter events based on search term and selected tag
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || event.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <Layout>
      <div className="bg-gradient-to-b from-magic-light/50 to-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-magic-dark mb-4">
              Descubre Eventos Espirituales
            </h1>
            <p className="text-magic-dark/70 max-w-2xl mx-auto">
              Explora y conecta con experiencias transformadoras que elevarán tu consciencia
            </p>
          </div>

          {/* Search and filters */}
          <div className="bg-white rounded-xl shadow-md border border-magic-light p-6 mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar eventos..."
                  className="pl-10 border-magic-light"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={selectedTag === null ? "default" : "outline"}
                  className={selectedTag === null ? "bg-magic" : "border-magic"}
                  onClick={() => setSelectedTag(null)}
                >
                  Todos
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className={selectedTag === tag ? "bg-magic" : "border-magic"}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Event listing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
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
                      {event.date.split(',')[0]}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs bg-magic-light text-magic-dark px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-magic-dark mb-2">{event.title}</h3>
                    <p className="text-magic-dark/70 mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-magic-dark/80">
                        <Calendar className="h-4 w-4 mr-2 text-magic" />
                        <span>{event.date} • {event.time}</span>
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
                      <div className="text-xl font-bold text-magic">
                        ${event.price.toLocaleString()}
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="border-magic hover:bg-magic-light transition-colors">
                          <Link to={`/events/${event.id}`}>
                            Detalles
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
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-magic-dark/70 mb-4">No se encontraron eventos que coincidan con tu búsqueda.</p>
                <Button 
                  variant="outline" 
                  className="border-magic hover:bg-magic-light transition-colors"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTag(null);
                  }}
                >
                  Ver todos los eventos
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
