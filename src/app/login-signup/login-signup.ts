import { Component } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  imports: [],
  templateUrl: './login-signup.html',
  styleUrl: './login-signup.css'
})
export class LoginSignup {
  activeTab: 'signin' | 'signup' = 'signin';
  selectedRole: 'buyer' | 'vendor' | 'admin' = 'buyer';

  setTab(tab: 'signin' | 'signup') {
    this.activeTab = tab;
  }

  setRole(role: 'buyer' | 'vendor' | 'admin') {
    this.selectedRole = role;
  }
}
