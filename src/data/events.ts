
export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: number;
  instructor: string;
  image: string;
  description: string;
  longDescription: string;
  capacity: number;
  availableTickets: number;
  tags: string[];
};

export const events: Event[] = [
  {
    id: '1',
    title: 'Retiro Espiritual en Cascada de las Ánimas',
    date: '17 de Mayo, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Cascada de las Ánimas',
    address: 'San José de Maipo, Región Metropolitana, Chile',
    price: 75000,
    instructor: 'Maestra Luna',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=600',
    description: 'Un día completo de conexión con la naturaleza y tu ser interior en un entorno mágico.',
    longDescription: `
      Te invitamos a un retiro espiritual único en la majestuosa Cascada de las Ánimas, ubicada en el corazón de la cordillera de los Andes chilenos.

      Durante esta experiencia transformadora, te reconectarás con la energía sanadora de la naturaleza mientras participas en diversas actividades guiadas por la Maestra Luna, reconocida guía espiritual con más de 15 años de experiencia.

      El retiro incluye:
      - Ceremonia de apertura junto a la cascada
      - Meditación guiada en entorno natural
      - Taller de conexión con los cuatro elementos
      - Ritual de liberación y manifestación
      - Almuerzo orgánico vegetariano
      - Material para todas las actividades
      - Certificado de participación

      Es importante traer ropa cómoda, calzado adecuado para caminatas ligeras, protección solar, una botella de agua y un cuaderno para anotaciones. El evento se realizará al aire libre, por lo que se recomienda también traer un abrigo ligero para los cambios de temperatura.

      Este retiro es una oportunidad única para desconectar del estrés cotidiano y sumergirte en un profundo viaje interior, rodeado de la energía poderosa de las montañas y el agua cristalina de la cascada.

      ¡No pierdas la oportunidad de vivir esta experiencia transformadora!
    `,
    capacity: 30,
    availableTickets: 20,
    tags: ['Meditación', 'Naturaleza', 'Retiro']
  }
];

export const getEvent = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};
