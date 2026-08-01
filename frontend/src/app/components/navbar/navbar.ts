import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})


export class Navbar {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private _cartService = inject(CartService);
  cartCount = this._cartService.cartCount;

  get isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // on the server, treat as logged out
    }
    return !!localStorage.getItem('token'); // or whatever your check is
  }

    logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}