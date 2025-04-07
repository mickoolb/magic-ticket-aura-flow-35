
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
    title: 'Retiro de Meditación y Sanación',
    date: '25 de Octubre, 2025',
    time: '10:00 AM - 6:00 PM',
    location: 'Centro de Paz Interior',
    address: 'Av. Espiritual 123, Col. Armonía',
    price: 1500,
    instructor: 'Maestra Luna',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600',
    description: 'Un fin de semana para reconectar con tu esencia y sanar tu espíritu.',
    longDescription: `
      Este retiro de meditación y sanación es una oportunidad única para desconectar del estrés cotidiano y sumergirte en un profundo viaje interior.

      Durante el día, practicarás diversas técnicas de meditación guiadas por la Maestra Luna, experta en sanación energética y espiritualidad. Aprenderás a liberar bloqueos emocionales, canalizar tu energía vital y establecer una conexión más profunda con tu yo interior.

      El retiro incluye:
      - Sesiones de meditación guiada
      - Talleres de sanación energética
      - Ejercicios de respiración consciente
      - Ceremonia de liberación
      - Comida vegetariana orgánica
      - Material para todas las actividades

      Es recomendable traer ropa cómoda, una botella de agua y un cuaderno para tomar notas. No se requiere experiencia previa en meditación.
    `,
    capacity: 30,
    availableTickets: 12,
    tags: ['Meditación', 'Sanación', 'Retiro']
  },
  {
    id: '2',
    title: 'Ceremonia de Luna Llena',
    date: '10 de Noviembre, 2025',
    time: '8:00 PM - 11:00 PM',
    location: 'Jardín Celestial',
    address: 'Camino al Cielo 456, Col. Estrellas',
    price: 800,
    instructor: 'Sabio Estelar',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600',
    description: 'Ritual para manifestar propósitos y limpiar energías bajo la luz de la luna llena.',
    longDescription: `
      La luna llena es un momento de culminación, un tiempo para cosechar lo que hemos sembrado y liberar aquello que ya no nos sirve. En esta ceremonia especial, aprovecharemos la energía lunar para potenciar nuestras intenciones y realizar una profunda limpieza energética.

      Guiados por el Sabio Estelar, reconocido astrólogo y maestro espiritual, realizaremos un ritual ancestral que combina elementos de diversas tradiciones espirituales adaptados a la conciencia moderna.

      La ceremonia incluye:
      - Ritual de apertura de círculo sagrado
      - Meditación lunar
      - Ceremonia de manifestación de propósitos
      - Ritual de liberación y gratitud
      - Infusiones herbales ceremoniales
      - Cristales programados bajo la luna llena (que podrás llevar contigo)

      Se recomienda vestir de blanco o colores claros y traer una manta para sentarse en el suelo del jardín. La ceremonia se realizará al aire libre, bajo la luz directa de la luna.
    `,
    capacity: 50,
    availableTickets: 20,
    tags: ['Luna Llena', 'Ritual', 'Manifestación']
  },
  {
    id: '3',
    title: 'Taller de Cristales y Energía',
    date: '15 de Diciembre, 2025',
    time: '11:00 AM - 3:00 PM',
    location: 'Centro Armónico',
    address: 'Calle Mineral 789, Col. Cristalina',
    price: 1200,
    instructor: 'Cristal de Luz',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600',
    description: 'Aprende a utilizar la energía de los cristales para armonizar tu vida.',
    longDescription: `
      Los cristales son poderosas herramientas que pueden ayudarnos a equilibrar nuestra energía, potenciar nuestras intenciones y facilitar procesos de sanación. En este taller práctico, aprenderás a identificar, limpiar, programar y utilizar diferentes cristales según tus necesidades específicas.

      Cristal de Luz, terapeuta certificada en cristaloterapia con más de 15 años de experiencia, te guiará en un viaje de descubrimiento sobre el fascinante mundo de los cristales y su aplicación en la vida cotidiana.

      El taller incluye:
      - Kit de 7 cristales básicos para tu desarrollo personal
      - Manual completo sobre propiedades y usos de los cristales
      - Prácticas de meditación con cristales
      - Técnicas de limpieza y programación
      - Cómo crear cuadrículas de cristales para diferentes propósitos
      - Certificado de participación

      No se requiere experiencia previa, solo una mente abierta y el deseo de aprender sobre estas maravillosas herramientas naturales.
    `,
    capacity: 25,
    availableTickets: 8,
    tags: ['Cristales', 'Energía', 'Taller']
  },
  {
    id: '4',
    title: 'Conferencia: El Poder de la Mente Consciente',
    date: '5 de Enero, 2026',
    time: '6:00 PM - 9:00 PM',
    location: 'Auditorio Iluminación',
    address: 'Blvd. Consciencia 234, Col. Despertar',
    price: 500,
    instructor: 'Dr. Mente Clara',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600',
    description: 'Descubre cómo el poder de tu mente puede transformar tu realidad.',
    longDescription: `
      Esta conferencia reveladora combina los últimos descubrimientos en neurociencia con antiguas prácticas de desarrollo mental. El Dr. Mente Clara, neurocientífico y practicante de meditación durante más de 30 años, presenta un enfoque revolucionario para entender y utilizar el poder de nuestra consciencia.

      Durante esta conferencia intensiva aprenderás:
      - Los mecanismos cerebrales detrás de la manifestación consciente
      - Técnicas científicamente probadas para reprogramar patrones mentales limitantes
      - Cómo utilizar la meditación para acceder a estados elevados de consciencia
      - El impacto de tus pensamientos en tu realidad física
      - Métodos prácticos para aplicar estos conocimientos en tu vida diaria

      Cada participante recibirá una grabación de meditación guiada especialmente diseñada por el Dr. Mente Clara y acceso a una comunidad en línea para continuar el aprendizaje después del evento.

      La conferencia incluye una sesión interactiva de preguntas y respuestas para abordar situaciones específicas de los participantes.
    `,
    capacity: 100,
    availableTickets: 45,
    tags: ['Mente', 'Consciencia', 'Conferencia']
  }
];

export const getEvent = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};
