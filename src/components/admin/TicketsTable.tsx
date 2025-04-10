
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Ticket } from '@/utils/ticketUtils';

interface TicketsTableProps {
  tickets: Ticket[];
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(ticket => 
    ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
  );
};

export default TicketsTable;
