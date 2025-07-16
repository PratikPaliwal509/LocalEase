import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { LoginSignup } from './login-signup/login-signup';
import { BuyerDashboard } from './buyer-dashboard/buyer-dashboard';
import { VendorDashboard } from './vendor-dashboard/vendor-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { OrderTracking } from './order-tracking/order-tracking';
import { PaymentGateway } from './payment-gateway/payment-gateway';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: LoginSignup },
  { path: 'buyer-dashboard', component: BuyerDashboard },
  { path: 'vendor-dashboard', component: VendorDashboard },
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'order-tracking', component: OrderTracking },
  { path: 'payment-gateway', component: PaymentGateway },
];
