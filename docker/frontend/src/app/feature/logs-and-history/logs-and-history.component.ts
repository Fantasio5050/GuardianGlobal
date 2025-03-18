import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logs-and-history',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-white p-6 shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4">Logs & Historique</h2>

    <!-- Filtrage des logs -->
    <div class="mb-4 flex space-x-2">
      <select #filter (change)="applyFilter(filter.value)" class="border p-2 rounded">
        <option value="all">Tous</option>
        <option value="ajout">Ajout</option>
        <option value="suppression">Suppression</option>
        <option value="alerte">Alerte</option>
      </select>
      <button (click)="confirmClearLogs()" class="bg-gray-500 text-white p-2 rounded">Effacer les logs</button>
    </div>

    <!-- Liste des logs -->
    <div *ngIf="filteredLogs.length > 0; else noLogs">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 text-left">Type</th>
            <th class="p-2 text-left">Description</th>
            <th class="p-2 text-left">Utilisateur</th>
            <th class="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let log of filteredLogs">
            <td class="p-2 font-semibold text-sm capitalize">{{ log.type }}</td>
            <td class="p-2">{{ log.message }}</td>
            <td class="p-2 text-blue-600">{{ log.user }}</td>
            <td class="p-2 text-gray-500">{{ log.date | date:'short' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucun log -->
    <ng-template #noLogs>
      <p class="text-gray-500">Aucun log enregistré.</p>
    </ng-template>
  </div>
  `,
})
export class LogsAndHistoryComponent {
  logs = [
    { type: 'ajout', message: 'Ajout d’un email à la Blacklist', user: 'Jean Dupont', date: new Date() },
    { type: 'suppression', message: 'Suppression d’un numéro de téléphone de la Whitelist', user: 'Marie Lemoine', date: new Date() },
    { type: 'alerte', message: 'Alerte de phishing détectée', user: 'Système', date: new Date() },
    { type: 'ajout', message: 'Ajout d’un email à la Whitelist', user: 'Luc Martin', date: new Date() },
  ];

  filteredLogs = [...this.logs];

  applyFilter(filter: string) {
    if (filter === 'all') {
      this.filteredLogs = [...this.logs];
    } else {
      this.filteredLogs = this.logs.filter(log => log.type === filter);
    }
  }

  confirmClearLogs() {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer tous les logs ?");
    if (confirmation) {
      this.clearLogs();
    }
  }

  clearLogs() {
    this.filteredLogs = [];
  }
}