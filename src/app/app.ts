import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginSignup } from './login-signup/login-signup';
import { LandingPage } from './landing-page/landing-page';
import { BuyerDashboard } from './buyer-dashboard/buyer-dashboard';
import { VendorDashboard } from './vendor-dashboard/vendor-dashboard';
import { OrderTracking } from './order-tracking/order-tracking';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './my-cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FavoritesComponent } from './favorites/favorites.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginSignup, LandingPage, BuyerDashboard, VendorDashboard, OrderTracking, ProfileComponent, CartComponent, MyOrdersComponent, FavoritesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
