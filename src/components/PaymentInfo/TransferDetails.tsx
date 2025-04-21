
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
                <span className="font-medium text-magic-dark">Mercado Pago</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("Mercado Pago", "Banco copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Tipo de Cuenta:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">Cuenta Vista</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("Cuenta Vista", "Tipo de cuenta copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Número de Cuenta:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">1025996448</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("1025996448", "Número de cuenta copiado")}>
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
                <span className="font-medium text-magic-dark">Ymairy del Carmen Arrivillaga Monsalve</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("Ymairy del Carmen Arrivillaga Monsalve", "Nombre copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">RUT:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">255211544</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("255211544", "RUT copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-magic-dark/70">Email:</span>
              <div className="flex items-center">
                <span className="font-medium text-magic-dark">patagonia.luztribal@gmail.com</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2" onClick={() => handleCopyToClipboard("patagonia.luztribal@gmail.com", "Email copiado")}>
                  <Copy className="h-4 w-4 text-magic" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 mr-3 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800">Importante:</h4>
              <p className="text-yellow-700 text-sm">
                Una vez realizada la transferencia, envía el comprobante de pago al correo patagonia.luztribal@gmail.com para confirmar tu compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferDetails;
