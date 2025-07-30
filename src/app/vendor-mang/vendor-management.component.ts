import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Vendor {
  name: string;
  company: string;
  contact: string;
}

@Component({
  selector: 'app-vendor-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.css']
})
export class VendorManagementComponent {
  vendors: Vendor[] = [
    { name: 'Amit Sharma', company: 'Sharma Supplies', contact: 'amit@sharma.com' },
    { name: 'Kavita Mehta', company: 'Mehta Distributors', contact: 'kavita@mehta.com' }
  ];

  newVendor: Vendor = { name: '', company: '', contact: '' };
  editingIndex: number | null = null;

  addVendor() {
    if (this.newVendor.name && this.newVendor.company && this.newVendor.contact) {
      this.vendors.push({ ...this.newVendor });
      this.newVendor = { name: '', company: '', contact: '' };
    }
  }

  editVendor(index: number) {
    this.editingIndex = index;
    this.newVendor = { ...this.vendors[index] };
  }

  updateVendor() {
    if (this.editingIndex !== null) {
      this.vendors[this.editingIndex] = { ...this.newVendor };
      this.cancelEdit();
    }
  }

  deleteVendor(index: number) {
    this.vendors.splice(index, 1);
  }

  cancelEdit() {
    this.editingIndex = null;
    this.newVendor = { name: '', company: '', contact: '' };
  }
}
