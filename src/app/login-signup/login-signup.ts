import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login-signup',
  templateUrl: './login-signup.html',
  styleUrls: ['./login-signup.css'],
  imports: [CommonModule]
})
export class LoginSignup {
  activeTab: 'signin' | 'signup' = 'signin';
  selectedRole: 'buyer' | 'vendor' | 'admin' = 'buyer';

  setTab(tab: 'signin' | 'signup') {
    this.activeTab = tab;
    console.log('Tab switched to:', this.activeTab);
  }

  setRole(role: 'buyer' | 'vendor' | 'admin') {
    this.selectedRole = role;
  }
}
