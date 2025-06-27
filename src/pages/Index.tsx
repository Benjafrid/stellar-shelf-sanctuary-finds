
import { useState, useMemo } from 'react';
import { books } from '../data/books';
import { Book, ViewMode, SortOption, BookFilters } from '../types/book';
import { Header } from '../components/Header';
import { FilterPanel } from '../components/FilterPanel';
import { BookCard } from '../components/BookCard';
import { BookList } from '../components/BookList';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { Toaster } from 'sonner';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [filters, setFilters] = useState<BookFilters>({
    genre: 'Todos',
    priceRange: [0, 50],
    rating: 0,
    language: 'Todos'
  });

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { cart, addToCart, getTotalItems, isInCart } = useCart();

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = filters.genre === 'Todos' || book.genre === filters.genre;
      const matchesPrice = book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1];
      const matchesRating = book.rating >= filters.rating;
      const matchesLanguage = filters.language === 'Todos' || book.language === filters.language;

      return matchesSearch && matchesGenre && matchesPrice && matchesRating && matchesLanguage;
    });

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.publishedYear - a.publishedYear;
        default:
          return 0;
      }
    });

    return filtered;
  }, [books, searchTerm, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      genre: 'Todos',
      priceRange: [0, 50],
      rating: 0,
      language: 'Todos'
    });
    setSearchTerm('');
  };

  const cartBookIds = cart.map(item => item.book.id);

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        favoritesCount={favorites.length}
        cartItemsCount={getTotalItems()}
        onShowFavorites={() => console.log('Mostrar favoritos')}
        onShowCart={() => {}} // Esta función ya no se usa porque navegamos directamente
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {showFilters && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={clearFilters}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-playfair font-semibold text-book-coffee mb-2">
                Catálogo de Libros
              </h2>
              <p className="text-book-coffee/70">
                {filteredAndSortedBooks.length} {filteredAndSortedBooks.length === 1 ? 'libro encontrado' : 'libros encontrados'}
              </p>
            </div>

            {filteredAndSortedBooks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-playfair font-semibold text-book-coffee mb-2">
                  No se encontraron libros
                </h3>
                <p className="text-book-coffee/70 mb-4">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <button
                  onClick={clearFilters}
                  className="text-book-coffee hover:text-book-burgundy underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedBooks.map((book) => (
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
            ) : (
              <BookList
                books={filteredAndSortedBooks}
                favorites={favorites}
                cartItems={cartBookIds}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            )}
          </div>
        </div>
      </div>

      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
};

export default Index;
