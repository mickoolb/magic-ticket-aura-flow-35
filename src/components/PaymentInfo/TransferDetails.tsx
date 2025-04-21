
import React from 'react';
import { CreditCard, Copy, User, Building, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TransferDetailsProps {
  amount: string;
  reference?: string;
}

const TransferDetails: React.FC<TransferDetailsProps> = ({ amount, reference }) => {
  const handleCopyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(message);
      })
      .catch(() => {
        toast.error("Error al copiar al portapapeles");
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6 md:p-8">
      <h2 className="text-2xl font-bold text-magic-dark mb-4">Datos de Transferencia</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-magic-dark mb-3 flex items-center">
            <Building className="h-5 w-5 mr-2 text-magic" />
            Datos Bancarios
          </h3>
          
          <div className="space-y-3 bg-magic-light/20 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Banco:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">Banco Estado</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("Banco Estado", "Banco copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Tipo de Cuenta:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">Cuenta Corriente</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("Cuenta Corriente", "Tipo de cuenta copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Número de Cuenta:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">00012345678</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("00012345678", "Número de cuenta copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-magic-dark mb-3 flex items-center">
            <User className="h-5 w-5 mr-2 text-magic" />
            Datos Personales
          </h3>
          
          <div className="space-y-3 bg-magic-light/20 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Nombre:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">María Luz Espiritual</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("María Luz Espiritual", "Nombre copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">RUT:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">12.345.678-9</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("12.345.678-9", "RUT copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Email:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">ceremonias@entredeosasvolcanes.cl</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("ceremonias@entredeosasvolcanes.cl", "Email copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-magic-dark mb-3 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-magic" />
            Información del Pago
          </h3>
          
          <div className="space-y-3 bg-magic-light/20 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Monto:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">${amount}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard(amount, "Monto copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            {reference && (
              <div className="flex justify-between items-center">
                <span className="text-magic-dark/70">Comentario:</span>
                <div className="flex items-center">
                  <span className="font-medium text-magic-dark">{reference}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard(reference, "Referencia copiada")}>
                    <Copy className="h-4 w-4 text-magic" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-3 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-yellow-800">Importante:</h4>
            <p className="text-yellow-700 text-sm">
              Una vez realizada la transferencia, envía el comprobante de pago al WhatsApp +56 945 835 342 
              o al correo ceremonias@entredeosasvolcanes.cl para confirmar tu compra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferDetails;
