
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { books } from '../data/books';
import { BookCard } from '../components/BookCard';
import { Header } from '../components/Header';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, getTotalItems, isInCart } = useCart();

  const favoriteBooks = books.filter(book => favorites.includes(book.id));

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchTerm=""
        onSearchChange={() => {}}
        viewMode="grid"
        onViewModeChange={() => {}}
        showFilters={false}
        onToggleFilters={() => {}}
        favoritesCount={favorites.length}
        cartItemsCount={getTotalItems()}
        onShowFavorites={() => {}}
        onShowCart={() => {}}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-playfair font-semibold text-book-coffee mb-2">
            Mis Favoritos
          </h2>
          <p className="text-book-coffee/70">
            {favoriteBooks.length} {favoriteBooks.length === 1 ? 'libro favorito' : 'libros favoritos'}
          </p>
        </div>

        {favoriteBooks.length === 0 ? (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-book-coffee/30 mx-auto mb-4" />
            <h3 className="text-xl font-playfair font-semibold text-book-coffee mb-2">
              No tienes favoritos aún
            </h3>
            <p className="text-book-coffee/70 mb-4">
              Explora nuestro catálogo y marca tus libros favoritos
            </p>
            <Link 
              to="/"
              className="inline-block bg-book-coffee text-white px-6 py-2 rounded-md hover:bg-book-burgundy transition-colors"
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={isFavorite(book.id)}
                isInCart={isInCart(book.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
