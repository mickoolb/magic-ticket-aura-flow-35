
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  getAllTickets, 
  validateTicket, 
  Ticket, 
  extractTicketIdFromQR,
  decodeQRCode,
  getPendingTickets,
  approvePendingTicket,
  rejectPendingTicket,
  PendingTicket
} from '@/utils/ticketUtils';
import { useToast } from '@/components/ui/use-toast';
import {
  CheckCircle,
  XCircle,
  LogOut,
  QrCode,
  Ticket as TicketIcon,
  Search,
  Users,
  ShieldCheck,
  Upload,
  Clock,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [pendingTickets, setPendingTickets] = useState<PendingTicket[]>([]);
  const [ticketId, setTicketId] = useState('');
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    ticket?: Ticket;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [qrImageFile, setQrImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApproving, setIsApproving] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Load tickets and pending tickets
    const loadedTickets = getAllTickets();
    const loadedPendingTickets = getPendingTickets();
    setTickets(loadedTickets);
    setPendingTickets(loadedPendingTickets);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setQrImageFile(e.target.files[0]);
    }
  };

  const handleScanQR = async () => {
    if (!qrImageFile) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una imagen de código QR",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Read the file as a data URL
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const imageDataUrl = event.target.result.toString();
          
          // Decode the QR code
          const qrData = await decodeQRCode(imageDataUrl);
          
          if (qrData) {
            // Extract the ticket ID from the QR data
            const extractedTicketId = extractTicketIdFromQR(qrData);
            
            if (extractedTicketId) {
              // Set the extracted ID and validate it
              setTicketId(extractedTicketId);
              
              // For demo purposes, we'll validate the ticket right away
              const result = validateTicket(extractedTicketId);
              setValidationResult(result);
              
              toast({
                title: "Código QR escaneado",
                description: `ID de boleto extraído: ${extractedTicketId}`,
                variant: "default"
              });
            } else {
              toast({
                title: "Error de formato",
                description: "No se pudo extraer el ID del boleto del código QR",
                variant: "destructive"
              });
            }
          } else {
            toast({
              title: "Error de escaneo",
              description: "No se pudo decodificar el código QR",
              variant: "destructive"
            });
          }
        }
        setIsProcessing(false);
      };
      
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Error al leer el archivo",
          variant: "destructive"
        });
        setIsProcessing(false);
      };
      
      reader.readAsDataURL(qrImageFile);
      
    } catch (error) {
      console.error("Error scanning QR code:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar el código QR",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const handleApproveTicket = async (pendingTicket: PendingTicket) => {
    setIsApproving({...isApproving, [pendingTicket.id]: true});
    
    try {
      await approvePendingTicket(pendingTicket.id);
      
      // Reload tickets and pending tickets
      const loadedTickets = getAllTickets();
      const loadedPendingTickets = getPendingTickets();
      setTickets(loadedTickets);
      setPendingTickets(loadedPendingTickets);
      
      toast({
        title: "Pago aprobado",
        description: `Se han generado ${pendingTicket.quantity} boleto(s) para ${pendingTicket.customerName}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al aprobar el pago",
        variant: "destructive"
      });
    } finally {
      setIsApproving({...isApproving, [pendingTicket.id]: false});
    }
  };

  const handleRejectTicket = async (pendingTicket: PendingTicket) => {
    setIsApproving({...isApproving, [pendingTicket.id]: true});
    
    try {
      await rejectPendingTicket(pendingTicket.id);
      
      // Reload pending tickets
      const loadedPendingTickets = getPendingTickets();
      setPendingTickets(loadedPendingTickets);
      
      toast({
        title: "Pago rechazado",
        description: `La solicitud de ${pendingTicket.customerName} ha sido rechazada`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al rechazar el pago",
        variant: "destructive"
      });
    } finally {
      setIsApproving({...isApproving, [pendingTicket.id]: false});
    }
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPendingTickets = pendingTickets.filter(ticket => 
    ticket.id.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.customerEmail.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
    ticket.paymentReference.toLowerCase().includes(pendingSearchTerm.toLowerCase())
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
          
          <Tabs defaultValue="pending">
            <TabsList className="bg-white border border-magic-light">
              <TabsTrigger value="pending" className="data-[state=active]:bg-magic data-[state=active]:text-white">
                <Clock className="h-4 w-4 mr-2" />
                Pagos Pendientes
              </TabsTrigger>
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
            
            {/* Nueva pestaña de Pagos Pendientes */}
            <TabsContent value="pending" className="mt-6">
              <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-magic-dark">Pagos Pendientes de Aprobación</h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-magic-dark/50 h-4 w-4" />
                    <Input
                      placeholder="Buscar solicitudes..."
                      value={pendingSearchTerm}
                      onChange={(e) => setPendingSearchTerm(e.target.value)}
                      className="pl-10 border-magic-light"
                    />
                  </div>
                </div>
                
                {filteredPendingTickets.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-magic-light/30 text-magic-dark">
                        <tr>
                          <th className="px-4 py-3 text-left">Referencia</th>
                          <th className="px-4 py-3 text-left">Evento</th>
                          <th className="px-4 py-3 text-left">Cliente</th>
                          <th className="px-4 py-3 text-left">Email</th>
                          <th className="px-4 py-3 text-left">Cantidad</th>
                          <th className="px-4 py-3 text-left">Monto</th>
                          <th className="px-4 py-3 text-left">Fecha Solicitud</th>
                          <th className="px-4 py-3 text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-magic-light/50">
                        {filteredPendingTickets.map((pendingTicket) => (
                          <tr key={pendingTicket.id} className="hover:bg-magic-light/20">
                            <td className="px-4 py-3 font-mono">{pendingTicket.paymentReference}</td>
                            <td className="px-4 py-3">{pendingTicket.eventName}</td>
                            <td className="px-4 py-3">{pendingTicket.customerName}</td>
                            <td className="px-4 py-3">{pendingTicket.customerEmail}</td>
                            <td className="px-4 py-3 text-center">{pendingTicket.quantity}</td>
                            <td className="px-4 py-3">${(pendingTicket.price * pendingTicket.quantity).toLocaleString()}</td>
                            <td className="px-4 py-3">{new Date(pendingTicket.requestDate).toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-1 bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
                                  onClick={() => handleApproveTicket(pendingTicket)}
                                  disabled={isApproving[pendingTicket.id]}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                  {isApproving[pendingTicket.id] ? 'Procesando' : 'Aprobar'}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-1 bg-red-50 border-red-200 hover:bg-red-100 text-red-700"
                                  onClick={() => handleRejectTicket(pendingTicket)}
                                  disabled={isApproving[pendingTicket.id]}
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                  Rechazar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-magic-dark/50">
                    No hay pagos pendientes de aprobación. {pendingSearchTerm ? 'Intenta con otra búsqueda.' : ''}
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Pestaña de Validar Boletos */}
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
                    
                    <div className="border border-dashed border-magic-light rounded-lg p-4">
                      <h3 className="font-semibold text-magic-dark mb-3 flex items-center">
                        <QrCode className="h-4 w-4 mr-2 text-magic" />
                        Escanear Código QR
                      </h3>
                      
                      <div className="mb-3">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="border-magic-light"
                        />
                      </div>
                      
                      <Button 
                        onClick={handleScanQR} 
                        disabled={!qrImageFile || isProcessing}
                        className="w-full magic-button flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <span>Procesando...</span>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Escanear QR y Extraer ID
                          </>
                        )}
                      </Button>
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
            
            {/* Pestaña de Boletos */}
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
            
            {/* Pestaña de Seguridad */}
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
