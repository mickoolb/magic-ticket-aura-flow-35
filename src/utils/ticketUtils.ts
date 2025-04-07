
import QRCode from 'qrcode';

// Type definition for a ticket
export type Ticket = {
  id: string;
  eventId: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  purchaseDate: string;
  eventDate: string;
  eventLocation: string;
  price: number;
  qrCode: string;
  used: boolean;
};

// Generate a unique ticket ID
export const generateTicketId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MT-${timestamp}-${randomStr}`;
};

// Generate QR code for a ticket
export const generateQRCode = async (ticketId: string): Promise<string> => {
  try {
    // In a real app, this would include a signature or encryption for security
    const data = JSON.stringify({
      ticketId,
      timestamp: Date.now(),
      secure: true
    });
    
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

// Create a new ticket
export const createTicket = async (
  eventId: string,
  eventName: string,
  customerName: string,
  customerEmail: string,
  eventDate: string,
  eventLocation: string,
  price: number
): Promise<Ticket> => {
  const ticketId = generateTicketId();
  const qrCode = await generateQRCode(ticketId);
  
  const ticket: Ticket = {
    id: ticketId,
    eventId,
    eventName,
    customerName,
    customerEmail,
    purchaseDate: new Date().toISOString(),
    eventDate,
    eventLocation,
    price,
    qrCode,
    used: false
  };
  
  // In a real app, save the ticket to a database
  // For this demo, we'll simulate storing it in localStorage
  const storedTickets = JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
  storedTickets.push(ticket);
  localStorage.setItem('magicticket_tickets', JSON.stringify(storedTickets));
  
  return ticket;
};

// Validate a ticket
export const validateTicket = (ticketId: string): { valid: boolean; message: string; ticket?: Ticket } => {
  // In a real app, this would validate against a database
  const storedTickets = JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
  const ticket = storedTickets.find((t: Ticket) => t.id === ticketId);
  
  if (!ticket) {
    return { valid: false, message: 'Boleto no encontrado' };
  }
  
  if (ticket.used) {
    return { valid: false, message: 'Este boleto ya ha sido utilizado', ticket };
  }
  
  // Mark the ticket as used
  ticket.used = true;
  localStorage.setItem('magicticket_tickets', JSON.stringify(storedTickets));
  
  return { valid: true, message: 'Boleto válido', ticket };
};

// Get all tickets (for admin)
export const getAllTickets = (): Ticket[] => {
  return JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
};

// Get user's tickets by email
export const getUserTickets = (email: string): Ticket[] => {
  const storedTickets = JSON.parse(localStorage.getItem('magicticket_tickets') || '[]');
  return storedTickets.filter((ticket: Ticket) => ticket.customerEmail.toLowerCase() === email.toLowerCase());
};
