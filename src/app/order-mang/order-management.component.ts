import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Order {
  orderId: string;
  customerName: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent {
  orders: Order[] = [
    { orderId: 'ORD001', customerName: 'Rohan Patil', status: 'Pending' },
    { orderId: 'ORD002', customerName: 'Neha Sharma', status: 'Shipped' }
  ];

  newOrder: Order = { orderId: '', customerName: '', status: 'Pending' };
  editingIndex: number | null = null;

  addOrder() {
    if (this.newOrder.orderId && this.newOrder.customerName) {
      this.orders.push({ ...this.newOrder });
      this.resetForm();
    }
  }

  editOrder(index: number) {
    this.editingIndex = index;
    this.newOrder = { ...this.orders[index] };
  }

  updateOrder() {
    if (this.editingIndex !== null) {
      this.orders[this.editingIndex] = { ...this.newOrder };
      this.resetForm();
    }
  }

  deleteOrder(index: number) {
    this.orders.splice(index, 1);
  }

  resetForm() {
    this.newOrder = { orderId: '', customerName: '', status: 'Pending' };
    this.editingIndex = null;
  }
}
