export interface SnackItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'popcorn' | 'drinks' | 'candy' | 'combos' | 'ice-cream';
  popular?: boolean;
  points?: number; // Reward points cost
}

export const snackCategories = [
  { id: 'popcorn', name: 'Popcorn', icon: '🍿' },
  { id: 'drinks', name: 'Beverages', icon: '🥤' },
  { id: 'candy', name: 'Candy & Sweets', icon: '🍭' },
  { id: 'combos', name: 'Combo Deals', icon: '🎯' },
  { id: 'ice-cream', name: 'Ice Cream', icon: '🍦' }
];

export const snackItems: SnackItem[] = [
  // Popcorn
  {
    id: 'popcorn-small',
    name: 'Small Popcorn',
    description: 'Freshly popped classic butter popcorn',
    price: 250,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    category: 'popcorn',
    points: 500
  },
  {
    id: 'popcorn-large',
    name: 'Large Popcorn',
    description: 'Extra large butter popcorn, perfect for sharing',
    price: 400,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    category: 'popcorn',
    popular: true,
    points: 800
  },
  {
    id: 'popcorn-caramel',
    name: 'Caramel Popcorn',
    description: 'Sweet caramel-coated popcorn',
    price: 350,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    category: 'popcorn',
    points: 700
  },

  // Drinks
  {
    id: 'soda-small',
    name: 'Small Soft Drink',
    description: 'Choice of Coke, Pepsi, Sprite, or Fanta',
    price: 150,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=300&fit=crop',
    category: 'drinks',
    points: 300
  },
  {
    id: 'soda-large',
    name: 'Large Soft Drink',
    description: 'Large size with free refill',
    price: 250,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=300&fit=crop',
    category: 'drinks',
    popular: true,
    points: 500
  },
  {
    id: 'water',
    name: 'Bottled Water',
    description: 'Premium bottled water',
    price: 100,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
    category: 'drinks',
    points: 200
  },

  // Candy
  {
    id: 'candy-mix',
    name: 'Cinema Mix',
    description: 'Assorted movie theater candy',
    price: 200,
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop',
    category: 'candy',
    points: 400
  },
  {
    id: 'chocolate',
    name: 'Premium Chocolate',
    description: 'Selection of premium chocolate bars',
    price: 300,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop',
    category: 'candy',
    points: 600
  },

  // Combos
  {
    id: 'combo-classic',
    name: 'Classic Combo',
    description: 'Large popcorn + Large drink',
    price: 550,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=300&h=300&fit=crop',
    category: 'combos',
    popular: true,
    points: 1100
  },
  {
    id: 'combo-deluxe',
    name: 'Deluxe Combo',
    description: 'Large popcorn + Large drink + Candy',
    price: 700,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=300&h=300&fit=crop',
    category: 'combos',
    points: 1400
  },

  // Ice Cream
  {
    id: 'ice-cream-cup',
    name: 'Premium Ice Cream',
    description: 'Choice of vanilla, chocolate, or strawberry',
    price: 200,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop',
    category: 'ice-cream',
    points: 400
  }
];

export const getSnacksByCategory = (category: string) => {
  return snackItems.filter(item => item.category === category);
};

export const getPopularSnacks = () => {
  return snackItems.filter(item => item.popular);
};