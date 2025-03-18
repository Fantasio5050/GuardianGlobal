import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="bg-white p-6 shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4">Paramètres</h2>

    <!-- Mode sombre / clair -->
    <div class="mb-4 flex justify-between items-center">
      <span>Mode sombre</span>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" (change)="toggleDarkMode()" [checked]="isDarkMode" class="hidden">
        <div class="w-10 h-5 bg-gray-300 rounded-full p-1 flex items-center" [class.bg-blue-500]="isDarkMode">
          <div class="w-4 h-4 bg-white rounded-full transition-transform transform" [class.translate-x-5]="isDarkMode"></div>
        </div>
      </label>
    </div>

    <!-- Notifications -->
    <div class="mb-4 flex justify-between items-center">
      <span>Notifications d'alerte</span>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" (change)="toggleNotifications()" [checked]="notificationsEnabled" class="hidden">
        <div class="w-10 h-5 bg-gray-300 rounded-full p-1 flex items-center" [class.bg-green-500]="notificationsEnabled">
          <div class="w-4 h-4 bg-white rounded-full transition-transform transform" [class.translate-x-5]="notificationsEnabled"></div>
        </div>
      </label>
    </div>

    <!-- Purge automatique des logs -->
    <div class="mb-4">
      <label class="block mb-2">Délai de purge automatique des logs (en jours)</label>
      <input type="number" [(ngModel)]="purgeDelay" min="1" class="border p-2 rounded w-full">
      <button (click)="savePurgeDelay()" class="mt-2 bg-blue-500 text-white p-2 rounded">Enregistrer</button>
    </div>
  </div>
  `
})
export class ParametresComponent {
  isDarkMode = localStorage.getItem('theme') === 'dark';
  notificationsEnabled = localStorage.getItem('notifications') === 'true';
  purgeDelay = Number(localStorage.getItem('purgeDelay')) || 7;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
    localStorage.setItem('notifications', this.notificationsEnabled.toString());
  }

  savePurgeDelay() {
    localStorage.setItem('purgeDelay', this.purgeDelay.toString());
    alert("Délai de purge mis à jour !");
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}