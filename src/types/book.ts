
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  currency: string;
  description: string;
  coverUrl: string;
  isbn: string;
  publishedYear: number;
  pages: number;
  rating: number;
  language: string;
}

export type ViewMode = 'grid' | 'list';

export type SortOption = 'title' | 'author' | 'price' | 'rating' | 'year';

export interface BookFilters {
  genre: string;
  priceRange: [number, number];
  rating: number;
  language: string;
}
