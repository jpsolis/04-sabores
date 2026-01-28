import * as bcrypt from 'bcrypt';

interface SeedGarzon {
  nombre: string;
}

interface SeedBebestible {
  nombre: string;
  tipo: string;
  precio: number;
}

interface SeedRestaurante {
  nombre: string;
  ubicacion: string;
}

interface SeedUser {
  email: string;
  nombreCompleto: string;
  password: string;
  roles: string[];
}

interface SeedColacion {
  nombre: string;
  descripcion: string;
  precio: number;
}

interface SeedData {
  restaurante: SeedRestaurante[];
  users: SeedUser[];
  colaciones: SeedColacion[];
  bebestibles: SeedBebestible[];
  garzones: SeedGarzon[];
}

export const initialData: SeedData = {
  users: [
    {
      email: '123@456.com',
      password: bcrypt.hashSync('Abc123', 10),
      nombreCompleto: 'Test Uno',
      roles: ['admin'],
    },
    {
      email: '345@678.com',
      password: bcrypt.hashSync('Abc123', 10),
      nombreCompleto: 'Test Dos',
      roles: ['user', 'super'],
    },
  ],

  restaurante: [
    {
      nombre: 'Sabores',
      ubicacion: 'Santa María 305, Buin',
    },
  ],

  colaciones: [
    {
      nombre: 'Pastel de Choclo',
      descripcion:
        'Delicioso plato chileno que consiste en una base de carne (res o pollo) cubierta con una mezcla de maíz molido, enriquecido con hierbas y especias.',
      precio: 8000,
    },
    {
      nombre: 'Empanadas de Pino',
      descripcion:
        'Masa rellena de una mezcla de carne picada, cebolla, huevo duro y aceitunas, horneadas al punto perfecto, símbolo de la tradición chilena.',
      precio: 2500,
    },
    {
      nombre: 'Cazuela Chilena',
      descripcion:
        'Guiso nutritivo que combina carne de vaca, zapallo, papas, choclo y otros vegetales, servido caliente, ideal para compartir en familia.',
      precio: 7000,
    },
    {
      nombre: 'Sopaipillas Pasadas',
      descripcion:
        'Masa de zapallo frita, bañada en un jarabe de chancaca, un dulce tentador típico de las fiestas y ventas callejeras.',
      precio: 1500,
    },
    {
      nombre: 'Completo Italiano',
      descripcion:
        'Versión chilena del hot dog, generosamente cubierto con palta, mayonesa y salsa de tomate, un clásico de la comida rápida en Chile.',
      precio: 3000,
    },
    {
      nombre: 'Porotos Granados',
      descripcion:
        'Guiso tradicional que combina porotos frescos con zapallo, maíz y otros vegetales de temporada, a menudo acompañado de arroz.',
      precio: 6500,
    },
  ],

  bebestibles: [
     {
        "nombre": "Agua Mineral",
        "tipo": "Refresco",
        "precio": 1.50
    },
    {
        "nombre": "Jugo de Naranja",
        "tipo": "Jugo",
        "precio": 2.00
    },
    {
        "nombre": "Cerveza",
        "tipo": "Alcohólico",
        "precio": 3.00
    },
    {
        "nombre": "Vino Tinto",
        "tipo": "Alcohólico",
        "precio": 10.00
    },
    {
        "nombre": "Refresco de Cola",
        "tipo": "Refresco",
        "precio": 1.75
    }
  ],

  garzones:[
    {
      "nombre": "Pedro",
    },
    {
      "nombre": "María",
    },
    {
      "nombre": "Juan",
    },
    {
      "nombre": "Zunilda",
    },
    {
      "nombre": "Diego",
    },
    {
      "nombre": "Gabriela",
    }
  ],
};
