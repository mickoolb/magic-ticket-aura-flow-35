
import React, { useState } from 'react';
import { PendingTicket } from '@/utils/ticketUtils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, FileImage } from 'lucide-react';

interface PaymentScreenshotsProps {
  pendingTickets: PendingTicket[];
}

const PaymentScreenshots: React.FC<PaymentScreenshotsProps> = ({ pendingTickets }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Filter tickets that have payment proof
  const ticketsWithProof = pendingTickets.filter(ticket => ticket.paymentProof);

  const viewImage = (imageData: string) => {
    setSelectedImage(imageData);
    setOpenDialog(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6">
      <h2 className="text-xl font-bold text-magic-dark mb-4">Comprobantes de Pago</h2>
      
      {ticketsWithProof.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Referencia</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Comprobante</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ticketsWithProof.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-mono">{ticket.paymentReference}</TableCell>
                <TableCell>{ticket.customerName}</TableCell>
                <TableCell>{ticket.customerEmail}</TableCell>
                <TableCell>{new Date(ticket.requestDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      ticket.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {ticket.status === 'pending' ? 'Pendiente' : 
                     ticket.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => viewImage(ticket.paymentProof!)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <FileImage className="h-3.5 w-3.5" />
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-magic-dark/50">
          No hay comprobantes de pago disponibles.
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Comprobante de Pago</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Comprobante de pago" 
                className="max-h-[70vh] object-contain border rounded-md"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentScreenshots;
