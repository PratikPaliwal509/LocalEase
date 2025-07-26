import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginSignup } from './login-signup/login-signup';
import { LandingPage } from './landing-page/landing-page';
import { BuyerDashboard } from './buyer-dashboard/buyer-dashboard';
import { VendorDashboard } from './vendor-dashboard/vendor-dashboard';
import { OrderTracking } from './order-tracking/order-tracking';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginSignup, LandingPage, BuyerDashboard, VendorDashboard, OrderTracking],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
