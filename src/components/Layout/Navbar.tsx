
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Ticket, Calendar, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-magic-light py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Ticket className="h-8 w-8 text-magic mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-magic to-magic-dark bg-clip-text text-transparent">
              MagicTicket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/events" className="text-magic-dark hover:text-magic font-medium transition-colors">
              Eventos
            </Link>
            <Link to="/about" className="text-magic-dark hover:text-magic font-medium transition-colors">
              Quiénes Somos
            </Link>
            <Link to="/admin" className="text-magic-dark hover:text-magic font-medium transition-colors">
              Administrador
            </Link>
            <Button asChild className="magic-button">
              <Link to="/buy">Comprar Boletos</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-magic-dark focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md pt-4 pb-6 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/events" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-magic-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar className="h-5 w-5 text-magic" />
              <span>Eventos</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-magic-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="h-5 w-5 text-magic" />
              <span>Quiénes Somos</span>
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-magic-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShieldCheck className="h-5 w-5 text-magic" />
              <span>Administrador</span>
            </Link>
            <Button asChild className="magic-button mt-2">
              <Link to="/buy" onClick={() => setIsMenuOpen(false)}>
                Comprar Boletos
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
