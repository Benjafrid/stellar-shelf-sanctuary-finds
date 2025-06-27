
import { Book } from '../types/book';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookmarkCheck, BookmarkPlus, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

interface BookListProps {
  books: Book[];
  favorites: string[];
  cartItems: string[];
  onToggleFavorite: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
}

export const BookList = ({ books, favorites, cartItems, onToggleFavorite, onAddToCart }: BookListProps) => {
  const handleToggleFavorite = (bookId: string) => {
    onToggleFavorite(bookId);
    const isFavorite = favorites.includes(bookId);
    toast.success(
      isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      { duration: 2000 }
    );
  };

  const handleAddToCart = (book: Book) => {
    onAddToCart(book);
    toast.success('Agregado al carrito', { duration: 2000 });
  };

  return (
    <div className="space-y-4">
      {books.map((book) => {
        const isFavorite = favorites.includes(book.id);
        const isInCart = cartItems.includes(book.id);
        
        return (
          <div
            key={book.id}
            className="flex bg-book-cream border border-book-gold/20 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 book-card-shadow"
          >
            <div className="flex-shrink-0 w-24 h-32 mr-4">
              <img
                src={book.coverUrl}
                alt={`Portada de ${book.title}`}
                className="w-full h-full object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop';
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-book-coffee mb-1">
                    {book.title}
                  </h3>
                  <p className="text-book-coffee/80 font-medium mb-2">
                    {book.author}
                  </p>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="secondary" className="bg-book-gold text-book-coffee">
                      {book.genre}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-book-coffee">
                        {book.rating}
                      </span>
                    </div>
                    <span className="text-book-coffee/60 text-sm">
                      {book.publishedYear}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleToggleFavorite(book.id)}
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                    isFavorite ? 'text-book-burgundy' : 'text-book-coffee hover:text-book-burgundy'
                  }`}
                >
                  {isFavorite ? <BookmarkCheck className="h-5 w-5" /> : <BookmarkPlus className="h-5 w-5" />}
                </button>
              </div>
              
              <p className="text-book-coffee/70 text-sm mb-3 line-clamp-2">
                {book.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-book-coffee font-playfair">
                    ${book.price}
                  </div>
                  <div className="text-xs text-book-coffee/60">
                    {book.pages} páginas • {book.language}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleAddToCart(book)}
                  disabled={isInCart}
                  className="bg-book-coffee hover:bg-book-burgundy text-book-cream transition-colors duration-200"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isInCart ? 'En carrito' : 'Agregar al carrito'}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
