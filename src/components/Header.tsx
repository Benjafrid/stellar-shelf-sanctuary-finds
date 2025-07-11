
import { Search, Filter, Grid, List, BookmarkCheck, ShoppingCart, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ViewMode } from '../types/book';
import { Link } from 'react-router-dom';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  favoritesCount: number;
  cartItemsCount: number;
  onShowFavorites: () => void;
  onShowCart: () => void;
}

export const Header = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  showFilters,
  onToggleFilters,
  favoritesCount,
  cartItemsCount,
  onShowFavorites,
  onShowCart
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center gap-2">
              <Star className="h-8 w-8 text-book-coffee" />
              <h1 className="text-3xl font-bold text-book-coffee font-playfair hover:text-book-burgundy transition-colors cursor-pointer">
                ARS
              </h1>
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:block">
              Tu librería virtual de confianza
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to="/favorites">
              <Button
                variant="outline"
                size="sm"
                className="relative"
              >
                <BookmarkCheck className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Favoritos</span>
                {favoritesCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button
                variant="outline"
                size="sm"
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Carrito</span>
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-book-cream border-book-gold/20 focus:border-book-gold"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={onToggleFilters}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
            </Button>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
