import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ import Router

@Component({
  standalone: true,
  selector: 'app-login-signup',
  templateUrl: './login-signup.html',
  styleUrls: ['./login-signup.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginSignup {
  activeTab: 'signin' | 'signup' = 'signin';
  selectedRole: 'buyer' | 'vendor' = 'buyer';

  // Form fields
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  number = '';

  constructor(private http: HttpClient, private router: Router) {} // ✅ inject Router

  setTab(tab: 'signin' | 'signup') {
    this.activeTab = tab;
  }

  setRole(role: 'buyer' | 'vendor') {
    this.selectedRole = role;
  }

  handleSubmit() {
    if (this.activeTab === 'signup') {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const payload = {
        name: this.name,
        email: this.email,
        mobile: this.number,
        password: this.password,
        role: this.selectedRole
      };

      this.http.post('http://localhost:5000/api/users/register', payload).subscribe({
        next: (res) => alert('Registered successfully!'),
        error: (err) => alert('Error: ' + (err.error?.message || err.message))
      });

    } else {
      const payload = {
        email: this.email,
        password: this.password,
        role: this.selectedRole
      };

      this.http.post('http://localhost:5000/api/users/login', payload).subscribe({
        next: (res) => {
          alert('Login successful!');
          if (this.selectedRole === 'buyer') {
            this.router.navigate(['/buyer-dashboard']);
          } else if (this.selectedRole === 'vendor') {
            this.router.navigate(['/vendor-dashboard']);
          }
        },
        error: (err) => alert('Login failed: ' + (err.error?.message || err.message))
      });
    }
  }
}
