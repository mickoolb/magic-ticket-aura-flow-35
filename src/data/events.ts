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
    time: '16:00 - 22:00 hrs',
    location: 'Cascada de las Ánimas',
    address: 'Camino al Volcán 31087, San Alfonso, Cajón del Maipo',
    price: 5990,
    instructor: 'DJ Césil, Diosas Pélvicas y más',
    image: '/lovable-uploads/87f70ee5-2639-4c68-84ee-bb7c628da506.png',
    description: 'Un evento único con música, baile y karaoke en un entorno natural espectacular.',
    longDescription: `
      Te invitamos a "Entre Diosas y Volcanes", un evento único en la majestuosa Cascada de las Ánimas.

      Durante esta experiencia inolvidable, disfrutarás de:
      - Música en vivo
      - Shows de danza
      - DJ Césil ambientando el evento
      - Presentaciones de Diosas Pélvicas
      - Micrófono abierto con premio
      - Un ambiente mágico en la naturaleza

      El evento incluye:
      - Acceso completo a todas las actividades
      - Zonas de descanso
      - Ambiente seguro y familiar
      - Una experiencia única en la naturaleza

      Es importante traer ropa cómoda, calzado adecuado para el entorno natural, protección solar y una botella de agua.

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
