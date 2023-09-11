export interface IProduct {
  id: number;
  price?: string;
  description?: string;
  name?: string;
  brand?: string;
  color?: string;
  stock?: number;
}

export class Product implements IProduct {
  constructor(
    public id: number,
    public price: string,
    public description: string,
    public name: string,
    public brand: string,
    public color: string,
    public stock: number,
    public mediaUrl: string
  ) {}
}

export function getProductIdentifier(product: IProduct): number {
  return product.id;
}

export const products: Product[] = [
  {
    id: 1,
    price: '700',
    description: 'Un chouette velo',
    name: 'Velo Petard 1033',
    brand: 'Entr',
    color: 'Bleu',
    stock: 10,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 2,
    price: '750',
    description: 'A versatile urban ride',
    name: 'Velo Racer 2010',
    brand: 'Entr',
    color: 'Black',
    stock: 8,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 3,
    price: '680',
    description: 'Perfect for daily commuting',
    name: 'Velo Commute 2022',
    brand: 'Entr',
    color: 'White',
    stock: 15,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 4,
    price: '800',
    description: 'High-performance road bike',
    name: 'Velo Speedster 1050',
    brand: 'Entr',
    color: 'Red',
    stock: 5,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 5,
    price: '720',
    description: 'Mountain adventure awaits',
    name: 'Velo Trailblazer 3033',
    brand: 'Entr',
    color: 'Green',
    stock: 12,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 6,
    price: '780',
    description: 'Sleek and lightweight design',
    name: 'Velo Aero 2055',
    brand: 'Entr',
    color: 'Silver',
    stock: 10,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 7,
    price: '650',
    description: 'Robust and reliable for the city',
    name: 'Velo Urban 4040',
    brand: 'Entr',
    color: 'Grey',
    stock: 20,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 8,
    price: '820',
    description: 'Conquer trails with ease',
    name: 'Velo Mountain 5055',
    brand: 'Entr',
    color: 'Yellow',
    stock: 6,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 9,
    price: '690',
    description: 'Comfortable and stylish',
    name: 'Velo Cruiser 6060',
    brand: 'Entr',
    color: 'Pink',
    stock: 14,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 10,
    price: '740',
    description: 'Elegance on two wheels',
    name: 'Velo Elite 7070',
    brand: 'Entr',
    color: 'Purple',
    stock: 8,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
  {
    id: 11,
    price: '770',
    description: 'Durability meets performance',
    name: 'Velo Hybrid 8080',
    brand: 'Entr',
    color: 'Orange',
    stock: 7,
    mediaUrl:
      'https://contents.mediadecathlon.com/p2085442/k$1f5134fa458ce679efee7464ed7ad738/sq/velo-tout-chemin-balade-electrique-original-920-e.jpg?format=auto&f=800x0',
  },
];
