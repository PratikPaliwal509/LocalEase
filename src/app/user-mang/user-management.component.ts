import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: User[] = [
    { name: 'ABC', email: 'ABC@example.com', role: 'Admin' },
    { name: 'RBC', email: 'rbx@example.com', role: 'Editor' }
  ];

  newUser: User = { name: '', email: '', role: 'Viewer' };
  editingIndex: number | null = null;

  addUser() {
    if (this.newUser.name && this.newUser.email) {
      this.users.push({ ...this.newUser });
      this.newUser = { name: '', email: '', role: 'Viewer' };
    }
  }

  editUser(index: number) {
    this.editingIndex = index;
    this.newUser = { ...this.users[index] };
  }

  updateUser() {
    if (this.editingIndex !== null) {
      this.users[this.editingIndex] = { ...this.newUser };
      this.cancelEdit();
    }
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  cancelEdit() {
    this.editingIndex = null;
    this.newUser = { name: '', email: '', role: 'Viewer' };
  }
}
