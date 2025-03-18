import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white dark:bg-gray-900 shadow-md p-4 flex items-center justify-between">
      <!-- Bouton Menu (Mobile) -->
      <button class="lg:hidden text-gray-600 dark:text-gray-300 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <!-- Logo -->
      <h1 class="text-xl font-bold text-gray-700 dark:text-gray-200">Guardian</h1>

      <!-- Barre de recherche -->
      <div class="hidden lg:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2">
        <input type="text" placeholder="Rechercher..." class="bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 px-2">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"></path>
        </svg>
      </div>

      <!-- Icônes Utilisateur & Thème -->
      <div class="flex items-center space-x-4">
        <button class="focus:outline-none">
          <img src="assets/ressources/images/profil_icon.jpg" class="w-10 h-10 rounded-full">
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent { }
