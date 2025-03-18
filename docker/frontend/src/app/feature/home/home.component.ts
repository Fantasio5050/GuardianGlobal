import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-100 p-6">
      <h1 class="text-3xl font-bold mb-6">Tableau de bord</h1>

      <!-- Statistiques -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="bg-white shadow-md p-6 rounded text-center">
          <h2 class="text-xl font-semibold">Adresses en Blacklist</h2>
          <p class="text-4xl font-bold text-red-500">{{ totalBlacklisted }}</p>
        </div>

        <div class="bg-white shadow-md p-6 rounded text-center">
          <h2 class="text-xl font-semibold">Adresses en Whitelist</h2>
          <p class="text-4xl font-bold text-green-500">{{ totalWhitelisted }}</p>
        </div>
      </div>

      <!-- Dernières alertes -->
      <div class="bg-white shadow-md p-6 rounded">
        <h2 class="text-2xl font-bold mb-4">Dernières alertes</h2>
        <ul class="divide-y divide-gray-200">
          <li *ngFor="let alert of recentAlerts" class="py-3">
            <strong>{{ alert.email }}</strong> - {{ alert.reason }} ({{ alert.date | date:'short' }})
          </li>
        </ul>
      </div>
    </div>
  `
})
export class HomeComponent {
  totalBlacklisted = 12;
  totalWhitelisted = 8;
  recentAlerts = [
    { email: 'phishing@danger.com', reason: 'Lien suspect détecté', date: new Date() },
    { email: 'hacker@fraud.net', reason: 'Tentative de vol de données', date: new Date() }
  ];
}
