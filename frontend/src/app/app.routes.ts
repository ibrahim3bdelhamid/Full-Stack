import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { authGuard } from './guards/auth-guard';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { Checkout } from './pages/checkout/checkout';
import { ProductDetails } from './components/product-details/product-details';
import { Verify } from './pages/verify/verify';

export const routes: Routes = [
    {path:'', redirectTo:"home", pathMatch:"full"},
    {path:'home', component:Home, title:"Home"},
    {path:'products', component:Products, title:"Products"},
    {path:'products/:id', component:ProductDetails, title:"Product Details"},
    {path:'contact', component:Contact, title:"Contact"},
    {path:'about', component:About, title:"About"},
    {path:'login', component:Login, title:"Login"},
    {path:'register', component:Register, title:"Register"},
    {path:'verify', component:Verify, title:"Verify Account"},
    {path:'cart', component:Cart, title:"Cart", canActivate:[authGuard]},
    {path:'cart/checkout', component:Checkout, title:"Checkout", canActivate:[authGuard]},
    {path:'**', component:NotFound, title:"Page not found"}

];
