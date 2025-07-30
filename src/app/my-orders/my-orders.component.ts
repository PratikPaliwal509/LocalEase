import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'] // Optional if using Tailwind
})
export class MyOrdersComponent {
  orders = [
    {
      orderId: 'ORD123456',
      date: '2025-07-26',
      status: 'Delivered',
      total: '₹1499',
      items: [
        { name: 'Noise Smartwatch', quantity: 1 },
        { name: 'Bluetooth Earphones', quantity: 1 }
      ]
    },
    {
      orderId: 'ORD123789',
      date: '2025-07-20',
      status: 'Shipped',
      total: '₹899',
      items: [
        { name: 'Laptop Sleeve', quantity: 1 }
      ]
    }
  ];
}
