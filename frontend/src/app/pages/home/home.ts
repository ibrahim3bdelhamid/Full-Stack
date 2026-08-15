import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Search } from '../../components/search/search';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  imports: [Search, ProductCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private _productsService = inject(ProductsService);

  products = signal<any[]>([]);
  loading = signal(true);

  bestSellers = computed(() =>
    this.products().filter((p) => p.badge === 'BEST_SELLER')
  );

  categories = [
    { name: 'Club Jerseys', image: '/images/products/real-madrid.jpg', icon: 'fa-shirt' },
    { name: 'Football Boots', image: '/images/products/boots-nike-vapor-edge-360.jpg', icon: 'fa-socks' },
    { name: 'Balls', image: '/images/products/ball-1.jpg', icon: 'fa-futbol' },
  ];

  features = [
    { icon: '/images/delivery.png', title: 'Fast Delivery', text: 'Nationwide shipping, right to your door.' },
    { icon: '/images/discount.png', title: 'Best Deals', text: 'Genuine discounts on selected gear, no gimmicks.' },
    { icon: '/images/history.png', title: 'Trusted Legacy', text: 'Official kits from clubs with real history.' },
  ];

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.product ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
