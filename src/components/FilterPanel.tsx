
import { genres } from '../data/books';
import { BookFilters, SortOption } from '../types/book';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FilterPanelProps {
  filters: BookFilters;
  onFiltersChange: (filters: BookFilters) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
}

export const FilterPanel = ({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  onClearFilters
}: FilterPanelProps) => {
  return (
    <Card className="w-full lg:w-80 bg-book-cream border-book-gold/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-playfair text-book-coffee">
            Filtros y Ordenamiento
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-book-coffee hover:text-book-burgundy"
          >
            Limpiar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-book-coffee mb-2 block">
            Ordenar por
          </label>
          <Select value={sortBy} onValueChange={onSortChange as (value: string) => void}>
            <SelectTrigger className="bg-background border-book-gold/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-book-gold/20">
              <SelectItem value="title">Título</SelectItem>
              <SelectItem value="author">Autor</SelectItem>
              <SelectItem value="price">Precio</SelectItem>
              <SelectItem value="rating">Calificación</SelectItem>
              <SelectItem value="year">Año</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-book-coffee mb-2 block">
            Género
          </label>
          <Select
            value={filters.genre}
            onValueChange={(value) => onFiltersChange({ ...filters, genre: value })}
          >
            <SelectTrigger className="bg-background border-book-gold/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-book-gold/20 max-h-60 overflow-auto">
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-book-coffee mb-2 block">
            Rango de Precio (USD)
          </label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
              max={50}
              min={0}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-book-coffee mb-2 block">
            Calificación mínima
          </label>
          <div className="px-2">
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => onFiltersChange({ ...filters, rating: value[0] })}
              max={5}
              min={0}
              step={0.1}
              className="mb-2"
            />
            <div className="text-center text-sm text-muted-foreground">
              {filters.rating.toFixed(1)} ⭐ y superior
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-book-coffee mb-2 block">
            Idioma
          </label>
          <Select
            value={filters.language}
            onValueChange={(value) => onFiltersChange({ ...filters, language: value })}
          >
            <SelectTrigger className="bg-background border-book-gold/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-book-gold/20">
              <SelectItem value="Todos">Todos los idiomas</SelectItem>
              <SelectItem value="Español">Español</SelectItem>
              <SelectItem value="Inglés">Inglés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
