
import React from 'react';
import { getTicketAvailability, TICKET_CONFIG } from '@/utils/ticketUtils';
import { Progress } from '@/components/ui/progress';

const TicketAvailability: React.FC = () => {
  const availability = getTicketAvailability();
  const soldPercentage = (availability.sold / TICKET_CONFIG.MAX_TICKETS) * 100;
  const pendingPercentage = (availability.pending / TICKET_CONFIG.MAX_TICKETS) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-magic-light p-6 mb-6">
      <h2 className="text-xl font-bold text-magic-dark mb-4">Disponibilidad de Boletos</h2>
      
      <div className="flex justify-between mb-2">
        <span className="text-sm text-magic-dark/70">Total permitido:</span>
        <span className="font-medium">{TICKET_CONFIG.MAX_TICKETS} boletos</span>
      </div>
      
      <div className="relative h-8 mb-6">
        <Progress value={soldPercentage + pendingPercentage} className="h-8 bg-gray-100 rounded-full" />
        <div 
          className="absolute top-0 left-0 h-full bg-green-500 rounded-l-full" 
          style={{ width: `${soldPercentage}%` }}
        ></div>
        <div 
          className="absolute top-0 left-0 h-full bg-yellow-400" 
          style={{ width: `${soldPercentage}%`, marginLeft: `${soldPercentage}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
          <p className="text-xs text-green-700 mb-1">Boletos Vendidos</p>
          <p className="text-2xl font-bold text-green-700">{availability.sold}</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-center">
          <p className="text-xs text-yellow-700 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-700">{availability.pending}</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
          <p className="text-xs text-blue-700 mb-1">Disponibles</p>
          <p className="text-2xl font-bold text-blue-700">{availability.available}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketAvailability;
