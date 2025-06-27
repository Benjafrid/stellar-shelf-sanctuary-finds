
import { Book } from '../types/book';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookmarkCheck, BookmarkPlus, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: (bookId: string) => void;
  onAddToCart: (book: Book) => void;
}

export const BookCard = ({ book, isFavorite, isInCart, onToggleFavorite, onAddToCart }: BookCardProps) => {
  const handleToggleFavorite = () => {
    onToggleFavorite(book.id);
    toast.success(
      isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      { duration: 2000 }
    );
  };

  const handleAddToCart = () => {
    onAddToCart(book);
    toast.success('Agregado al carrito', { duration: 2000 });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-book-cream border-book-gold/20 overflow-hidden book-card-shadow">
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-book-warm-beige to-book-gold/20">
          <img
            src={book.coverUrl}
            alt={`Portada de ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop';
            }}
          />
        </div>
        
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110 ${
            isFavorite ? 'text-book-burgundy' : 'text-book-coffee hover:text-book-burgundy'
          }`}
        >
          {isFavorite ? <BookmarkCheck className="h-5 w-5" /> : <BookmarkPlus className="h-5 w-5" />}
        </button>

        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-book-gold text-book-coffee font-medium">
            {book.genre}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-playfair font-semibold text-lg text-book-coffee line-clamp-2 leading-tight">
            {book.title}
          </h3>
          
          <p className="text-book-coffee/80 text-sm font-medium">
            {book.author}
          </p>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-book-coffee">
                {book.rating}
              </span>
            </div>
            <span className="text-book-coffee/60 text-xs">
              ({book.publishedYear})
            </span>
          </div>
          
          <p className="text-book-coffee/70 text-sm line-clamp-2 leading-relaxed">
            {book.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-book-coffee font-playfair">
              ${book.price}
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={isInCart}
              className="bg-book-coffee hover:bg-book-burgundy text-book-cream transition-colors duration-200"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isInCart ? 'En carrito' : 'Agregar'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-book-coffee/60 pt-1">
            <span>{book.pages} páginas</span>
            <span>{book.language}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
