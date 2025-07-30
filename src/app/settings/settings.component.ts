import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  fullName = '';
  email = '';
  currentPassword = '';
  newPassword = '';
  emailNotifications = true;
  smsNotifications = false;

  saveSettings() {
    console.log('Settings saved', {
      fullName: this.fullName,
      email: this.email,
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      emailNotifications: this.emailNotifications,
      smsNotifications: this.smsNotifications,
    });
    alert('Settings saved successfully!');
  }
}
