
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
  Ticket as TicketIcon 
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
