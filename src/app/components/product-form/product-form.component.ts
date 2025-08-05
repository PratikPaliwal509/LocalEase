import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Add this

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add CommonModule here!
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() productAdded = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  isVisible = true;

  product = {
    name: '',
    price: null,
    category: '',
    description: '',
    image: null
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;
    }
  }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.closed.emit();
  }

  onSubmit() {
    this.productAdded.emit(this.product);
    this.close();
    this.product = { name: '', price: null, category: '', description: '',image: null };
  }
}
