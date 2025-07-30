import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editMode = false;

  profile = {
    name: 'Pratik Paliwal',
    email: 'pratik@example.com',
    phone: '1234567890',
    address: 'Nagpur, India',
    bio: 'Passionate web developer.',
    profileImage: 'https://via.placeholder.com/150'
  };

  enableEdit() {
    this.editMode = true;
  }

  saveChanges() {
    this.editMode = false;
    console.log('Updated Profile:', this.profile);
  }

  // ✅ Add this to fix the error
  updateProfile() {
    this.saveChanges(); // optional reuse
  }
}
