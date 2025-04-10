
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, QrCode, Upload } from 'lucide-react';
import { Ticket, validateTicket, extractTicketIdFromQR, decodeQRCode } from '@/utils/ticketUtils';
import { useToast } from '@/hooks/use-toast';

interface TicketValidatorProps {
  validationResult: {
    valid: boolean;
    message: string;
    ticket?: Ticket;
  } | null;
  setValidationResult: React.Dispatch<React.SetStateAction<{
    valid: boolean;
    message: string;
    ticket?: Ticket;
  } | null>>;
}

const TicketValidator: React.FC<TicketValidatorProps> = ({ 
  validationResult, 
  setValidationResult 
}) => {
  const { toast } = useToast();
  const [ticketId, setTicketId] = useState('');
  const [qrImageFile, setQrImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const imageDataUrl = event.target.result.toString();
          
          const qrData = await decodeQRCode(imageDataUrl);
          
          if (qrData) {
            const extractedTicketId = extractTicketIdFromQR(qrData);
            
            if (extractedTicketId) {
              setTicketId(extractedTicketId);
              
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

  return (
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
  );
};

export default TicketValidator;
