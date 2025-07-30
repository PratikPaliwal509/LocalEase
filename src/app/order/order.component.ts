import { Component, OnInit } from '@angular/core';

interface Order {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  status: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone: true,
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders = [
      { id: 1, productName: 'Laptop', quantity: 1, price: 55000, status: 'Pending' },
      { id: 2, productName: 'Mobile', quantity: 2, price: 40000, status: 'Shipped' },
      { id: 3, productName: 'Headphones', quantity: 1, price: 3000, status: 'Delivered' },
    ];
  }

  viewOrder(order: Order) {
    alert(`Viewing order #${order.id}`);
  }

  editOrder(order: Order) {
    alert(`Editing order #${order.id}`);
  }

  deleteOrder(order: Order) {
    const confirmDelete = confirm(`Delete order #${order.id}?`);
    if (confirmDelete) {
      this.orders = this.orders.filter(o => o.id !== order.id);
    }
  }
}
