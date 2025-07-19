import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  templateUrl: './buyer-dashboard.html',
  styleUrl: './buyer-dashboard.css'
})
export class BuyerDashboard implements OnInit {

  accountName: string = 'Michael'; // Default fallback

  ngOnInit(): void {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      this.accountName = storedName;
    }
  }
}
