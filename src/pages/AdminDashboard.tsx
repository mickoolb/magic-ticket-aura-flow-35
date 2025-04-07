
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllTickets, validateTicket, Ticket } from '@/utils/ticketUtils';
import { useToast } from '@/components/ui/use-toast';
import {
  CheckCircle,
  XCircle,
  LogOut,
  QrCode,
  Ticket as TicketIcon,
  Search,
  Users,
  ShieldCheck
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketId, setTicketId] = useState('');
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    ticket?: Ticket;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load tickets from localStorage
    const loadedTickets = getAllTickets();
    setTickets(loadedTickets);
  }, [validationResult]);

  const handleValidateTicket = () => {
    if (!ticketId.trim()) {
      toast({
        title: "Error de validación",
        description: "Por favor, ingresa un ID de boleto válido.",
        variant: "destructive"
      });
      return;
    }
    
    const result = validateTicket(ticketId);
    setValidationResult(result);
    
    toast({
      title: result.valid ? "Boleto Válido" : "Boleto Inválido",
      description: result.message,
      variant: result.valid ? "default" : "destructive"
    });
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-magic-light/50 to-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-magic-dark">Panel de Administración</h1>
              <p className="text-magic-dark/70">
                Bienvenido, {user?.username}. Aquí puedes validar boletos y administrar el sistema.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-magic hover:bg-magic-light"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
          
          <Tabs defaultValue="validate">
            <TabsList className="bg-white border border-magic-light">
              <TabsTrigger value="validate" className="data-[state=active]:bg-magic data-[state=active]:text-white">
                <QrCode className="h-4 w-4 mr-2" />
                Validar Boletos
              </TabsTrigger>
              <TabsTrigger value="tickets" className="data-[state=active]:bg-magic data-[state=active]:text-white">
                <TicketIcon className="h-4 w-4 mr-2" />
                Boletos
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-magic data-[state=active]:text-white">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Seguridad
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="validate" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
                  <h2 className="text-xl font-bold text-magic-dark mb-4">Validar Boleto</h2>
                  <p className="text-magic-dark/70 mb-6">
                    Ingresa el ID del boleto o escanea el código QR para validar su autenticidad.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ingresa el ID del boleto"
                        value={ticketId}
                        onChange={(e) => setTicketId(e.target.value)}
                        className="border-magic-light"
                      />
                      <Button onClick={handleValidateTicket} className="magic-button whitespace-nowrap">
                        Validar Boleto
                      </Button>
                    </div>
                    
                    <div className="text-center p-4 border border-dashed border-magic-light rounded-lg">
                      <QrCode className="h-12 w-12 mx-auto text-magic-dark/30 mb-2" />
                      <p className="text-magic-dark/70 text-sm">
                        Escanea un código QR para validar (funcionalidad simulada)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
                  <h2 className="text-xl font-bold text-magic-dark mb-4">Resultado de Validación</h2>
                  
                  {validationResult ? (
                    <div>
                      <div className="flex items-center mb-4">
                        {validationResult.valid ? (
                          <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-500 mr-2" />
                        )}
                        <div>
                          <h3 className={`font-bold ${validationResult.valid ? 'text-green-600' : 'text-red-600'}`}>
                            {validationResult.valid ? 'Boleto Válido' : 'Boleto Inválido'}
                          </h3>
                          <p className="text-magic-dark/70">{validationResult.message}</p>
                        </div>
                      </div>
                      
                      {validationResult.ticket && (
                        <div className="bg-magic-light/30 rounded-lg p-4 mt-4">
                          <h4 className="font-semibold text-magic-dark mb-2">Detalles del Boleto</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-magic-dark/70">ID:</span>
                              <span className="font-mono">{validationResult.ticket.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-magic-dark/70">Evento:</span>
                              <span>{validationResult.ticket.eventName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-magic-dark/70">Asistente:</span>
                              <span>{validationResult.ticket.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-magic-dark/70">Email:</span>
                              <span>{validationResult.ticket.customerEmail}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-magic-dark/70">Fecha de compra:</span>
                              <span>{new Date(validationResult.ticket.purchaseDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-magic-dark/70">Estado:</span>
                              <span className={validationResult.ticket.used ? 'text-red-500' : 'text-green-500'}>
                                {validationResult.ticket.used ? 'Utilizado' : 'No utilizado'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-magic-dark/50">
                      No hay resultados para mostrar. Valida un boleto para ver su información.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tickets" className="mt-6">
              <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-magic-dark">Todos los Boletos</h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 h-4 w-4" />
                    <Input
                      placeholder="Buscar boletos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-magic-light"
                    />
                  </div>
                </div>
                
                {filteredTickets.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-magic-light/30 text-magic-dark">
                        <tr>
                          <th className="px-4 py-3 text-left">ID Boleto</th>
                          <th className="px-4 py-3 text-left">Evento</th>
                          <th className="px-4 py-3 text-left">Asistente</th>
                          <th className="px-4 py-3 text-left">Email</th>
                          <th className="px-4 py-3 text-left">Fecha de Compra</th>
                          <th className="px-4 py-3 text-left">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-magic-light/50">
                        {filteredTickets.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-magic-light/20">
                            <td className="px-4 py-3 font-mono">{ticket.id}</td>
                            <td className="px-4 py-3">{ticket.eventName}</td>
                            <td className="px-4 py-3">{ticket.customerName}</td>
                            <td className="px-4 py-3">{ticket.customerEmail}</td>
                            <td className="px-4 py-3">{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${ticket.used ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {ticket.used ? 'Utilizado' : 'No utilizado'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-magic-dark/50">
                    No se encontraron boletos. {searchTerm ? 'Intenta con otra búsqueda.' : ''}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
                <h2 className="text-xl font-bold text-magic-dark mb-4">Administración de Seguridad</h2>
                <p className="text-magic-dark/70 mb-6">
                  Administra usuarios del panel y consulta el registro de actividades de seguridad.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-magic-dark mb-4">Usuarios Administradores</h3>
                    <div className="bg-magic-light/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-magic mr-2" />
                          <span className="font-semibold">admin</span>
                        </div>
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Activo</span>
                      </div>
                      <p className="text-sm text-magic-dark/70">
                        Este es un demo con un usuario administrador predefinido. En una implementación real, aquí podrías gestionar múltiples usuarios con diferentes niveles de permiso.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-magic-dark mb-4">Registro de Actividad</h3>
                    <div className="bg-magic-light/30 rounded-lg p-4">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <span className="bg-magic-light/70 text-magic-dark px-2 py-1 rounded text-xs mr-2 whitespace-nowrap">
                            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                          </span>
                          <span>Inicio de sesión exitoso (Usuario: admin)</span>
                        </div>
                        <div className="flex items-start">
                          <span className="bg-magic-light/70 text-magic-dark px-2 py-1 rounded text-xs mr-2 whitespace-nowrap">
                            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                          </span>
                          <span>Acceso al panel de administración</span>
                        </div>
                        <p className="text-magic-dark/70 mt-2">
                          Este es un registro simulado. En una implementación real, aquí verías un historial completo de actividades de seguridad.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
