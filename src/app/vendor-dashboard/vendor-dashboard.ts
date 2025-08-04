// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-vendor-dashboard',
//   standalone: true,
//   templateUrl: './vendor-dashboard.html',
//   styleUrl: './vendor-dashboard.css'
// })
// export class VendorDashboard {}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Add this
import { ProductFormComponent } from '../components/product-form/product-form.component';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, ProductFormComponent], // ✅ Include CommonModule here
  templateUrl: './vendor-dashboard.html',
  styleUrl: './vendor-dashboard.css'
})
export class VendorDashboard {
  showProductForm = false;

  openProductForm() {
    console.log('Opening product form');
    this.showProductForm = true;
  }

  handleProductAdd(product: any) {
    console.log('Product added:', product);
    this.showProductForm = false;
  }
}
