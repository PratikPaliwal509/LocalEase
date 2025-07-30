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
import { UserManagementComponent } from './user-mang/user-management.component';
import { VendorManagementComponent } from './vendor-mang/vendor-management.component';
import { OrderManagementComponent } from './order-mang/order-management.component';
import { ProductPageComponent } from './product/product-page.component';
import { OrderComponent } from './order/order.component';
import { ReturnsRefundsComponent } from './return-refunds/returns-refunds.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginSignup, LandingPage, BuyerDashboard, VendorDashboard, OrderTracking, ProfileComponent, CartComponent, MyOrdersComponent, FavoritesComponent, UserManagementComponent, VendorManagementComponent, OrderManagementComponent, ProductPageComponent, OrderComponent, ReturnsRefundsComponent, SettingsComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
