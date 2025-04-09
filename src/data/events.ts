
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
    title: 'Entre Diosas y Volcanes',
    date: '17 de Mayo, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Cascada de las Ánimas',
    address: 'San José de Maipo, Región Metropolitana, Chile',
    price: 5900,
    instructor: 'Varios Artistas Invitados',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=600',
    description: 'Un evento inolvidable con música, baile, karaoke y mucha diversión en un entorno natural único.',
    longDescription: `
      Te invitamos a "Entre Diosas y Volcanes", un evento único en la majestuosa Cascada de las Ánimas, ubicada en el corazón de la cordillera de los Andes chilenos.

      Durante esta experiencia inolvidable, disfrutarás de un día completo de entretenimiento con:
      - Presentaciones de varios artistas invitados
      - Sesiones de baile
      - Karaoke para todos los asistentes
      - Actividades recreativas
      - Un ambiente festivo y natural incomparable

      El evento incluye:
      - Acceso completo a todas las actividades
      - Zonas de descanso
      - Ambiente seguro y familiar
      - Una experiencia única en la naturaleza

      Es importante traer ropa cómoda, calzado adecuado para el entorno natural, protección solar, una botella de agua y mucha energía para disfrutar. El evento se realizará al aire libre, por lo que se recomienda también traer un abrigo ligero para los cambios de temperatura.

      Este evento es una oportunidad única para desconectar del estrés cotidiano y disfrutar de un día de música y diversión, rodeado de la energía poderosa de las montañas y el agua cristalina de la cascada.

      ¡No pierdas la oportunidad de vivir esta experiencia inolvidable!
    `,
    capacity: 100,
    availableTickets: 80,
    tags: ['Música', 'Baile', 'Karaoke', 'Entretenimiento']
  }
];

export const getEvent = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};
