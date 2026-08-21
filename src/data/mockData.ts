export interface Deal {
  id: string;
  title: string;
  merchant: string;
  category: 'Dining' | 'Cinema' | 'Shopping' | 'Travel' | 'Groceries';
  discount: string;
  pointsCost: number;
  originalPrice?: string;
  dealPrice?: string;
  image: string;
  location: string;
  expiry: string;
  description: string;
  rating: number;
  popular?: boolean;
}

export interface Movie {
  id: string;
  title: string;
  titleSinhala?: string;
  genre: string;
  year: number;
  duration: string;
  rating: string;
  poster: string;
  director: string;
  description: string;
  badge?: string;
}

export const MOCK_DEALS: Deal[] = [
  {
    id: 'd1',
    title: '30% OFF Large Pan Pizza Combo',
    merchant: 'Pizza Hut Sri Lanka',
    category: 'Dining',
    discount: '30% OFF',
    originalPrice: 'LKR 3,800',
    dealPrice: 'LKR 2,660',
    pointsCost: 400,
    location: 'All Island Outlets',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    expiry: 'Valid 30 Days',
    description:
      '30% off any Large Triple Cheese or BBQ Chicken Pan Pizza + 1.5L Beverage at any Pizza Hut outlet islandwide.',
    rating: 4.9,
    popular: true,
  },
  {
    id: 'd2',
    title: 'Buy 1 Get 1 FREE Artisan Coffee',
    merchant: 'Barista Sri Lanka',
    category: 'Dining',
    discount: 'BOGO FREE',
    originalPrice: 'LKR 1,250',
    dealPrice: 'LKR 625',
    pointsCost: 250,
    location: 'Colombo 03, 07 & Mount Lavinia',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    expiry: 'Valid 14 Days',
    description: 'Order any large hot or iced handcrafted coffee and receive a second drink completely free.',
    rating: 4.8,
    popular: true,
  },
  {
    id: 'd3',
    title: 'LKR 1,000 OFF Double Cinema Pass',
    merchant: 'Liberty Cineplex',
    category: 'Cinema',
    discount: 'LKR 1,000 OFF',
    originalPrice: 'LKR 2,800',
    dealPrice: 'LKR 1,800',
    pointsCost: 500,
    location: 'Liberty Plaza, Colombo 03',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    expiry: 'Valid 45 Days',
    description: 'LKR 1,000 discount on 2 tickets for any Sinhala or Hollywood blockbuster + 1 Large Popcorn combo.',
    rating: 4.9,
    popular: true,
  },
  {
    id: 'd4',
    title: '15% OFF Monthly Fresh Groceries',
    merchant: 'Cargills FoodCity',
    category: 'Groceries',
    discount: '15% OFF',
    originalPrice: 'LKR 10,000',
    dealPrice: 'LKR 8,500',
    pointsCost: 650,
    location: 'All FoodCity Outlets Islandwide',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    expiry: 'Valid 60 Days',
    description: 'Save 15% on your total supermarket bill when purchasing fresh produce, dairy, and household essentials.',
    rating: 4.7,
  },
  {
    id: 'd5',
    title: '25% OFF Weekend Luxury Resort Stay',
    merchant: 'Ceylon Luxury Retreats',
    category: 'Travel',
    discount: '25% OFF',
    originalPrice: 'LKR 32,000',
    dealPrice: 'LKR 24,000',
    pointsCost: 1200,
    location: 'Kandy & Nuwara Eliya Highlands',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
    expiry: 'Valid 90 Days',
    description: 'Luxury hillside suite stay including gourmet buffet breakfast and spa voucher for 2 adults.',
    rating: 4.95,
  },
  {
    id: 'd6',
    title: 'LKR 1,500 Fashion Gift Voucher',
    merchant: 'ODEL & Cotton Collection',
    category: 'Shopping',
    discount: 'LKR 1,500 VOUCHER',
    originalPrice: 'LKR 5,000',
    dealPrice: 'LKR 3,500',
    pointsCost: 750,
    location: 'Alexandra Place & One Galle Face',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    expiry: 'Valid 30 Days',
    description: 'Redeem LKR 1,500 instant discount on premium designer apparel, footwear, and lifestyle accessories.',
    rating: 4.6,
  },
];

export const MOCK_MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Gautama',
    titleSinhala: 'ගෞතම',
    genre: 'Historical Drama',
    year: 2024,
    duration: '2h 15m',
    rating: '8.9',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    director: 'Prasanna Vithanage',
    description: 'An epic tale of courage, devotion, and royal saga set in ancient Sri Lanka.',
    badge: 'Thina Exclusive',
  },
  {
    id: 'm2',
    title: 'Midunu Vishwaya',
    titleSinhala: 'මිදුණු විශ්වය',
    genre: 'Sci-Fi Thriller',
    year: 2023,
    duration: '1h 55m',
    rating: '8.6',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    director: 'Jayantha Chandrasiri',
    description: 'A mind-bending journey across parallel dimensions linked to ancient mystical folklore.',
    badge: 'Trending #1',
  },
  {
    id: 'm3',
    title: 'Kathuru Mithuru',
    titleSinhala: 'කතුරු මිතුරු',
    genre: 'Comedy Family',
    year: 2023,
    duration: '2h 05m',
    rating: '8.4',
    poster: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&auto=format&fit=crop&q=80',
    director: 'Giriraj Kaushalya',
    description: 'A heartwarming village rivalry turned into an unbreakable family bond filled with laughter.',
    badge: 'Family Favorite',
  },
  {
    id: 'm4',
    title: 'Adadaraneeya Kathawa',
    titleSinhala: 'ආදරණීය කතාව',
    genre: 'Romance Musical',
    year: 2024,
    duration: '2h 10m',
    rating: '8.7',
    poster: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=800&auto=format&fit=crop&q=80',
    director: 'Priyantha Fernando',
    description: 'A romantic musical journey through the misty teagardens of Nuwara Eliya.',
    badge: 'Blockbuster',
  },
  {
    id: 'm5',
    title: 'Sanda Eliya',
    titleSinhala: 'සඳ එළිය',
    genre: 'Drama',
    year: 2024,
    duration: '1h 48m',
    rating: '8.2',
    poster: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=800&auto=format&fit=crop&q=80',
    director: 'Asoka Handagama',
    description: 'A poetic exploration of memory, love, and redemption in rural Sri Lanka.',
    badge: 'Award Winner',
  },
  {
    id: 'm6',
    title: 'Mahagedara',
    titleSinhala: 'මහගෙදර',
    genre: 'Action Thriller',
    year: 2023,
    duration: '2h 02m',
    rating: '8.5',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    director: 'Udayakantha Warnasuriya',
    description: 'A high-octane family action saga set against a backdrop of political mystery.',
    badge: 'High Octane',
  },
];
