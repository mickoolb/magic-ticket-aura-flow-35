
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { getEvent } from '@/data/events';
import { createPendingTicket, getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TicketFAQ from '@/components/FAQ/TicketFAQ';
import { Calendar, MapPin, CreditCard, Mail, User, Phone, Minus, Plus, CheckCircle2, CopyIcon, AlertCircle, Clock, X, Upload, Info, Ban, FileText, ArrowRight } from 'lucide-react';

const BuyTicket = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const eventId = searchParams.get('event');
  const event = eventId ? getEvent(eventId) : null;
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDocument, setCustomerDocument] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [availability, setAvailability] = useState(getTicketAvailability());

  useEffect(() => {
    if (!event && eventId) {
      toast.error("El evento solicitado no está disponible.");
      navigate('/events');
    }
    
    setAvailability(getTicketAvailability());
  }, [event, eventId, navigate]);

  useEffect(() => {
    if (step === 2 && customerName) {
      const date = new Date();
      const reference = `MT-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${customerName.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setPaymentReference(reference);
    }
  }, [step, customerName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error("El tamaño máximo permitido es 5MB");
        return;
      }
      
      setPaymentProof(file);
    }
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    
    if (!paymentProof) {
      toast.error("Por favor, sube una captura de tu comprobante de pago.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const reader = new FileReader();
      reader.readAsDataURL(paymentProof);
      reader.onload = async () => {
        const base64Image = reader.result as string;
        
        await createPendingTicket(
          event.id, 
          event.title, 
          customerName, 
          customerEmail, 
          event.date, 
          event.location, 
          event.price, 
          quantity, 
          paymentReference,
          base64Image
        );
        
        setStep(3);
        toast.success("¡Solicitud enviada! Recibirás tus boletos por correo una vez que se verifique el pago (1-2 horas).");
      };
      
      reader.onerror = () => {
        toast.error("No se pudo procesar el archivo. Intenta con otro formato.");
        setIsSubmitting(false);
      };
    } catch (error) {
      toast.error("Ocurrió un error al procesar tu solicitud. Inténtalo nuevamente.");
      setIsSubmitting(false);
    }
  };

  const handleCopyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message);
    }, err => {
      console.error('Error al copiar: ', err);
      toast.error("No se pudo copiar el texto");
    });
  };

  if (!event) {
    return <Layout>
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-magic-dark">Selecciona un evento</h1>
            <p className="text-magic-dark/70 mt-2 mb-6">Por favor, selecciona un evento para comprar boletos.</p>
            <Button asChild>
              <a href="/events">Ver Eventos Disponibles</a>
            </Button>
          </div>
        </div>
      </Layout>;
  }

  return (
    <Layout>
      <div className="bg-gradient-to-b from-magic-light/50 to-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-magic-light">
                  <h1 className="text-xl font-bold text-magic-dark">Comprar Entrada Mágica</h1>
                  <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-magic-dark/70 mb-6">Completa tus datos personales para adquirir tu entrada.</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        1
                      </div>
                      <div className="font-medium">Datos</div>
                    </div>
                    <div className="flex-grow mx-4 h-1 bg-gray-200">
                      <div className="h-full bg-purple-500 w-0"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                        2
                      </div>
                      <div className="text-gray-500">Pago</div>
                    </div>
                    <div className="flex-grow mx-4 h-1 bg-gray-200">
                      <div className="h-full bg-purple-500 w-0"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                        3
                      </div>
                      <div className="text-gray-500">Confirmación</div>
                    </div>
                  </div>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!customerName || !customerEmail || !customerPhone || !customerDocument) {
                      toast.error("Por favor completa todos los campos obligatorios");
                      return;
                    }
                    setStep(2);
                  }}>
                    <div className="space-y-4 mb-8">
                      <div>
                        <Label htmlFor="name" className="flex items-center">
                          Nombre completo <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="name" 
                          placeholder="-----" 
                          className="border-purple-200 focus:border-purple-500" 
                          value={customerName} 
                          onChange={e => setCustomerName(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="flex items-center">
                          Email <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Tu correo electrónico" 
                          className="border-purple-200 focus:border-purple-500" 
                          value={customerEmail} 
                          onChange={e => setCustomerEmail(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="flex items-center">
                          Teléfono <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="Tu número de teléfono" 
                          className="border-purple-200 focus:border-purple-500" 
                          value={customerPhone} 
                          onChange={e => setCustomerPhone(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="document" className="flex items-center">
                          RUT/DNI <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input 
                          id="document" 
                          placeholder="Tu documento de identidad" 
                          className="border-purple-200 focus:border-purple-500" 
                          value={customerDocument} 
                          onChange={e => setCustomerDocument(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="quantity">Cantidad de entradas</Label>
                        <div className="flex items-center mt-1">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full" 
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3 font-semibold">{quantity}</span>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full" 
                            onClick={() => setQuantity(prev => Math.min(availability.available, prev + 1))} 
                            disabled={quantity >= availability.available}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="ml-3 text-sm text-gray-500">{availability.available} disponibles</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-magic-light">
                  <h1 className="text-xl font-bold text-magic-dark">Comprar Entrada Mágica</h1>
                  <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <div className="font-medium">Datos</div>
                    </div>
                    <div className="flex-grow mx-4 h-1 bg-green-500"></div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        2
                      </div>
                      <div className="font-medium">Pago</div>
                    </div>
                    <div className="flex-grow mx-4 h-1 bg-gray-200"></div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                        3
                      </div>
                      <div className="text-gray-500">Confirmación</div>
                    </div>
                  </div>
                  
                  <div className="mb-6 space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-magic-dark mb-2">Resumen de la orden</h3>
                      <div className="flex justify-between items-center">
                        <span>{quantity} x Entrada {event.title}</span>
                        <span className="font-semibold">${(event.price * quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-magic-light/10 border border-magic-light/50 rounded-lg p-5 mb-6">
                    <div className="flex items-center text-magic mb-4">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      <h3 className="font-medium">Instrucciones de pago</h3>
                    </div>
                    
                    <p className="text-magic-dark/80 mb-4">
                      Para completar tu compra, realiza una transferencia bancaria con los siguientes datos:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-md p-3 border border-magic-light">
                        <div className="flex justify-between items-center">
                          <span className="text-magic-dark/70">Banco:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">Banco MagicTicket</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("Banco MagicTicket", "Nombre del banco copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md p-3 border border-magic-light">
                        <div className="flex justify-between items-center">
                          <span className="text-magic-dark/70">Titular:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">MagicTicket S.A.</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("MagicTicket S.A.", "Nombre del titular copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md p-3 border border-magic-light">
                        <div className="flex justify-between items-center">
                          <span className="text-magic-dark/70">Cuenta:</span>
                          <div className="flex items-center">
                            <span className="font-semibold">1234-5678-9012-3456</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("1234-5678-9012-3456", "Número de cuenta copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md p-3 border border-magic-light">
                        <div className="flex justify-between items-center">
                          <span className="text-magic-dark/70">Monto:</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-magic">${(event.price * quantity).toLocaleString()}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard(`${(event.price * quantity).toLocaleString()}`, "Monto copiado")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md p-3 border border-magic-light">
                        <div className="flex justify-between items-center">
                          <span className="text-magic-dark/70">Referencia:</span>
                          <div className="flex items-center">
                            <span className="font-semibold text-magic">{paymentReference}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard(paymentReference, "Referencia copiada")}>
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-magic-dark mb-3">Comprobante de Pago</h3>
                    <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
                      <Upload className="h-10 w-10 mx-auto mb-3 text-purple-400" />
                      <p className="text-magic-dark/70 mb-3">
                        Sube una captura de pantalla de tu comprobante de pago
                      </p>
                      <input 
                        type="file" 
                        id="payment-proof" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                        required 
                      />
                      <Button 
                        variant="outline" 
                        className="border-purple-300 text-purple-500 hover:bg-purple-50"
                        onClick={() => document.getElementById('payment-proof')?.click()}
                      >
                        Seleccionar Archivo
                      </Button>
                      {paymentProof && (
                        <div className="mt-3 p-2 bg-purple-50 rounded text-purple-700">
                          <p className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            {paymentProof.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <form onSubmit={handlePurchase}>
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-purple-300 text-purple-500 hover:bg-purple-50">
                        Volver
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-purple-500 hover:bg-purple-600 text-white" 
                        disabled={isSubmitting || !paymentProof}
                      >
                        {isSubmitting ? 'Procesando...' : 'Confirmar Pago'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-xl shadow-md border border-magic-light overflow-hidden">
                <div className="p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-magic-dark mb-2">¡Solicitud Enviada!</h1>
                  <p className="text-magic-dark/70 mb-8 max-w-md mx-auto">
                    Hemos registrado tu solicitud de compra. Un administrador verificará tu pago en un periodo de 1 a 2 horas y te enviaremos tus boletos al correo electrónico <strong>{customerEmail}</strong>.
                  </p>

                  <div className="bg-magic-light/30 rounded-lg p-4 mb-8 max-w-md mx-auto">
                    <h3 className="font-semibold text-magic-dark mb-3">Detalles de tu solicitud:</h3>
                    <div className="text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-magic-dark/70">Referencia:</span>
                        <span className="font-mono">{paymentReference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-magic-dark/70">Evento:</span>
                        <span>{event.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-magic-dark/70">Cantidad:</span>
                        <span>{quantity} boleto(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-magic-dark/70">Total:</span>
                        <span className="font-semibold">${(event.price * quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <Button onClick={() => navigate('/')} className="bg-purple-500 hover:bg-purple-600 text-white">
                      Volver al inicio
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyTicket;
