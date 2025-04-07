import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Star,
  Heart,
  Shield,
  Users,
  Calendar,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-magic-light/70 to-white py-16 md:py-24">
        <div className="mandala-bg w-[800px] h-[800px] top-[-400px] right-[-400px]"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-magic-dark mb-6">
              Quiénes Somos
            </h1>
            <p className="text-xl text-magic-dark/80 mb-8">
              Conectando almas a través de experiencias transformadoras. MagicTicket es la plataforma que une a personas en búsqueda de crecimiento espiritual con eventos que elevan la consciencia.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-magic-dark mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-magic-dark/80">
                <p>
                  MagicTicket nació de una visión: crear un espacio donde las personas puedan encontrar fácilmente eventos que nutran su espíritu y elevan su consciencia.
                </p>
                <p>
                  Fundada en 2023 por un grupo de entusiastas del desarrollo personal y espiritual, nuestra plataforma se ha convertido en el puente que conecta a buscadores con maestros, talleres y experiencias transformadoras.
                </p>
                <p>
                  Lo que comenzó como un pequeño proyecto se ha convertido en una comunidad vibrante de personas comprometidas con su crecimiento interior y el bienestar colectivo.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-magic-light/50 to-magic-pink/30 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=600" 
                alt="Nuestra historia" 
                className="relative z-10 rounded-2xl shadow-xl w-full h-auto transform -rotate-3 transition-transform hover:rotate-0 duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission and Values */}
      <div className="py-16 md:py-24 bg-magic-light/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-magic-dark mb-4">Nuestra Misión y Valores</h2>
            <p className="text-magic-dark/80">
              Nos guiamos por principios que promueven la integridad, el crecimiento y la conexión espiritual.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="magic-card text-center">
              <div className="w-12 h-12 bg-magic-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-magic-dark" />
              </div>
              <h3 className="text-xl font-bold text-magic-dark mb-2">Autenticidad</h3>
              <p className="text-magic-dark/70">
                Promovemos eventos y experiencias auténticas que realmente transforman vidas y elevan consciencias.
              </p>
            </div>
            
            <div className="magic-card text-center">
              <div className="w-12 h-12 bg-magic-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-magic-dark" />
              </div>
              <h3 className="text-xl font-bold text-magic-dark mb-2">Seguridad</h3>
              <p className="text-magic-dark/70">
                Garantizamos la seguridad en cada transacción y la legitimidad de cada evento en nuestra plataforma.
              </p>
            </div>
            
            <div className="magic-card text-center">
              <div className="w-12 h-12 bg-magic-peach rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-magic-dark" />
              </div>
              <h3 className="text-xl font-bold text-magic-dark mb-2">Excelencia</h3>
              <p className="text-magic-dark/70">
                Nos esforzamos por ofrecer la mejor experiencia posible, desde la compra del boleto hasta el evento mismo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-magic-dark mb-4">Nuestro Equipo</h2>
            <p className="text-magic-dark/80">
              Somos un grupo diverso de entusiastas del crecimiento personal y la tecnología, comprometidos con facilitar experiencias transformadoras.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Laura Luz",
                role: "Fundadora y CEO",
                bio: "Apasionada por unir tecnología y espiritualidad para crear experiencias transformadoras.",
                image: "https://i.pravatar.cc/300?img=27"
              },
              {
                name: "Carlos Paz",
                role: "Director de Operaciones",
                bio: "Experto en logística y organización de eventos con enfoque en experiencias significativas.",
                image: "https://i.pravatar.cc/300?img=11"
              },
              {
                name: "Ana Estrella",
                role: "Directora de Experiencia",
                bio: "Especialista en crear conexiones genuinas entre asistentes y organizadores de eventos.",
                image: "https://i.pravatar.cc/300?img=32"
              },
              {
                name: "Miguel Serenidad",
                role: "Director Tecnológico",
                bio: "Ingeniero de software con pasión por crear soluciones tecnológicas éticas y seguras.",
                image: "https://i.pravatar.cc/300?img=59"
              }
            ].map((member, index) => (
              <div key={index} className="magic-card text-center hover:scale-[1.03] transition-transform">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-magic-light"
                />
                <h3 className="text-xl font-bold text-magic-dark">{member.name}</h3>
                <p className="text-magic mb-2">{member.role}</p>
                <p className="text-magic-dark/70 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-purple p-8 md:p-12">
            <div className="mandala-bg w-[500px] h-[500px] opacity-20 top-[-150px] right-[-150px]"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Únete a nuestra misión
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Sé parte de una comunidad que busca el bienestar espiritual y el crecimiento personal a través de eventos transformadores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="magic-button-gold">
                  <Link to="/events">
                    Descubrir Eventos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-colors">
                  <a href="mailto:info@magicticket.com">Contáctanos</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-magic-dark mb-6">Contáctanos</h2>
              <p className="text-magic-dark/80 mb-8">
                Estamos aquí para ayudarte en cada paso del camino. Si tienes preguntas, sugerencias o quieres organizar un evento en nuestra plataforma, no dudes en contactarnos.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-magic-dark/80">
                  <Mail className="h-5 w-5 mr-3 text-magic" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:info@magicticket.com" className="hover:text-magic transition-colors">
                      info@magicticket.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center text-magic-dark/80">
                  <Users className="h-5 w-5 mr-3 text-magic" />
                  <div>
                    <div className="font-medium">Atención a Organizadores</div>
                    <a href="mailto:eventos@magicticket.com" className="hover:text-magic transition-colors">
                      eventos@magicticket.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center text-magic-dark/80">
                  <Calendar className="h-5 w-5 mr-3 text-magic" />
                  <div>
                    <div className="font-medium">Horario de Atención</div>
                    <div>Lunes a Viernes: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-magic-light">
              <h3 className="text-xl font-bold text-magic-dark mb-4">Envíanos un Mensaje</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Nombre</Label>
                  <Input id="contact-name" type="text" className="border-magic-light" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" className="border-magic-light" />
                </div>
                <div>
                  <Label htmlFor="contact-subject">Asunto</Label>
                  <Input id="contact-subject" type="text" className="border-magic-light" />
                </div>
                <div>
                  <Label htmlFor="contact-message">Mensaje</Label>
                  <textarea 
                    id="contact-message" 
                    rows={4} 
                    className="w-full border border-magic-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-magic focus:border-transparent"
                  ></textarea>
                </div>
                <Button className="magic-button w-full">Enviar Mensaje</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
