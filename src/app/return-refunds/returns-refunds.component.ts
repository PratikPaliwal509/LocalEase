import { Component } from '@angular/core';

@Component({
  selector: 'app-returns-refunds',
  templateUrl: './returns-refunds.component.html'
})
export class ReturnsRefundsComponent {
  returnRequests = [
    { id: 101, orderId: 'ORD-456', customer: 'Alice', reason: 'Damaged item', status: 'Pending' },
    { id: 102, orderId: 'ORD-789', customer: 'Bob', reason: 'Wrong size', status: 'Pending' }
  ];

  viewRequest(request: any) {
    alert(`Viewing request for Order ID: ${request.orderId}`);
  }

  approveRequest(request: any) {
    request.status = 'Approved';
  }

  rejectRequest(request: any) {
    request.status = 'Rejected';
  }
}
