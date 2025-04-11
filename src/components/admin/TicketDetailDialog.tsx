
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  DollarSign, 
  Ticket as TicketIcon,
  Fingerprint,
  Clock,
  Ban,
  AlertCircle
} from 'lucide-react';
import { Ticket } from '@/utils/ticketUtils';

interface TicketDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTicket: Ticket | null;
}

const TicketDetailDialog: React.FC<TicketDetailDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedTicket 
}) => {
  if (!selectedTicket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Boleto: {selectedTicket.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md border border-magic-light">
            <div className="mx-auto w-48 h-48 mb-4">
              <img src={selectedTicket.qrCode} alt="Código QR" className="w-full h-full object-contain" />
            </div>
            
            <h3 className="text-xl font-bold text-magic-dark text-center mb-4">
              {selectedTicket.eventName}
            </h3>
            
            {/* Customer name display - prominently shown below event name */}
            <div className="bg-magic-light/10 p-3 rounded-md border border-magic-light/20 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-magic" />
                  <span className="text-sm font-medium text-magic-dark">Comprado por:</span>
                </div>
                <span className="font-medium text-magic-dark">{selectedTicket.customerName}</span>
              </div>
            </div>
            
            {/* Ticket ID display - prominently shown below event name */}
            <div className="bg-magic-light/20 p-3 rounded-md border border-magic-light/30 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5 text-magic" />
                  <span className="text-sm font-medium text-magic-dark">ID del Boleto:</span>
                </div>
                <span className="font-mono font-semibold text-magic">{selectedTicket.id}</span>
              </div>
              <p className="text-xs text-magic-dark/70 mt-1">
                Utiliza este ID para validar el boleto en el panel de administración
              </p>
            </div>
            
            {/* Important information section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
              <h4 className="font-medium text-yellow-800 flex items-center mb-2">
                <AlertCircle className="h-4 w-4 mr-1.5" />
                Información Importante
              </h4>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex items-start">
                  <Clock className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <p>Se recomienda llegar 15 minutos antes del evento</p>
                </div>
                <div className="flex items-start">
                  <Ban className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                  <p>Se prohíbe ingresar alcohol y bebidas al evento</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-magic-dark/70">Fecha del Evento</p>
                  <p className="font-medium">{new Date(selectedTicket.eventDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-magic-dark/70">Lugar</p>
                  <p className="font-medium">{selectedTicket.eventLocation}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-magic-dark/70">Asistente</p>
                  <p className="font-medium">{selectedTicket.customerName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-magic-dark/70">Email</p>
                  <p className="font-medium">{selectedTicket.customerEmail}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-magic-dark/70">Precio</p>
                  <p className="font-medium">${selectedTicket.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <TicketIcon className="h-4 w-4 text-magic mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-magic-dark/70">Fecha de compra</p>
                  <p className="font-medium">{new Date(selectedTicket.purchaseDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`h-4 w-4 mt-1 rounded-full flex-shrink-0 ${selectedTicket.used ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <div>
                  <p className="text-sm text-magic-dark/70">Estado</p>
                  <p className={`font-medium ${selectedTicket.used ? 'text-red-600' : 'text-green-600'}`}>
                    {selectedTicket.used ? 'Utilizado' : 'No utilizado'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-dashed border-magic-light/50">
              <p className="text-xs text-center text-magic-dark/70">ID: <span className="font-mono">{selectedTicket.id}</span></p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={() => onOpenChange(false)}
              className="magic-button"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailDialog;
