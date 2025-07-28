import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  products: Product[] = [
    { name: 'Laptop', price: 80000, stock: 20 },
    { name: 'Phone', price: 25000, stock: 50 }
  ];

  newProduct: Product = { name: '', price: 0, stock: 0 };
  editingIndex: number | null = null;

  addProduct() {
    if (this.newProduct.name && this.newProduct.price >= 0) {
      this.products.push({ ...this.newProduct });
      this.cancelEdit();
    }
  }

  editProduct(index: number) {
    this.editingIndex = index;
    this.newProduct = { ...this.products[index] };
  }

  updateProduct() {
    if (this.editingIndex !== null) {
      this.products[this.editingIndex] = { ...this.newProduct };
      this.cancelEdit();
    }
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }

  cancelEdit() {
    this.newProduct = { name: '', price: 0, stock: 0 };
    this.editingIndex = null;
  }
}
