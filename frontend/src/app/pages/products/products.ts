import { Component, OnInit, computed, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { Search } from '../../components/search/search';
import { ProductsService } from '../../services/products.service';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

@Component({
  selector: 'app-products',
  imports: [ProductCard, Search],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  products = signal<any[]>([]);

  searchTerm = signal('');
  selectedCategory = signal('All');
  selectedTeam = signal('All');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  sortOrder = signal<SortOption>('default');

  categories = computed(() => {
    const set = new Set<string>(this.products().map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  });

  teams = computed(() => {
    const set = new Set<string>(this.products().map(p => p.team).filter((t: string) => !!t));
    return ['All', ...Array.from(set).sort()];
  });

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    const team = this.selectedTeam();
    const min = this.minPrice();
    const max = this.maxPrice();
    const sort = this.sortOrder();

    let result = this.products().filter(p => {
      const matchesTerm = !term ||
        p.name?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term) ||
        p.team?.toLowerCase().includes(term);

      const matchesCategory = category === 'All' || p.category === category;
      const matchesTeam = team === 'All' || p.team === team;

      const effectivePrice = this.effectivePrice(p);
      const matchesMin = min === null || min === undefined || effectivePrice >= min;
      const matchesMax = max === null || max === undefined || effectivePrice <= max;

      return matchesTerm && matchesCategory && matchesTeam && matchesMin && matchesMax;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return this.effectivePrice(a) - this.effectivePrice(b);
        case 'price-desc':
          return this.effectivePrice(b) - this.effectivePrice(a);
        case 'rating-desc':
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    });

    return result;
  });

  constructor(private _productService: ProductsService) {}

  effectivePrice(product: any): number {
    if (product.discountPercent > 0) {
      return Math.round(product.price * (1 - product.discountPercent / 100));
    }
    return product.price;
  }

  getProducts() {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.product);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
  }

  onCategoryChange(event: Event) {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  onTeamChange(event: Event) {
    this.selectedTeam.set((event.target as HTMLSelectElement).value);
  }

  onMinPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.minPrice.set(value === '' ? null : Number(value));
  }

  onMaxPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.maxPrice.set(value === '' ? null : Number(value));
  }

  onSortChange(event: Event) {
    this.sortOrder.set((event.target as HTMLSelectElement).value as SortOption);
  }

  resetFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('All');
    this.selectedTeam.set('All');
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.sortOrder.set('default');
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
