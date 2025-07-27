import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites: string[] = ['MacBook Pro', 'Angular Docs', 'GitHub'];
  newItem: string = '';

  addFavorite() {
    if (this.newItem.trim()) {
      this.favorites.push(this.newItem.trim());
      this.newItem = '';
    }
  }

  removeFavorite(index: number) {
    this.favorites.splice(index, 1);
  }
}
