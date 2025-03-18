import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-white p-6 shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4">Notifications</h2>

    <!-- Bouton pour effacer toutes les alertes -->
    <button (click)="clearAllAlerts()" class="bg-gray-500 text-white p-2 mb-4 rounded">Effacer toutes les alertes</button>

    <!-- Liste des alertes -->
    <div *ngIf="alerts.length > 0; else noAlerts">
      <ul class="divide-y divide-gray-200">
        <li *ngFor="let alert of alerts; let i = index" class="bg-red-100 p-4 mb-2 rounded flex justify-between items-center">
          <div>
            <strong class="text-red-600">Expéditeur : {{ alert.email }}</strong> - {{ alert.reason }}
            <br>
            <span class="text-gray-500 text-sm">Date : {{ alert.date | date:'short' }}</span>
            <br>
            <div class="mt-2 p-2 bg-gray-200 rounded">
              <span class="font-semibold">Destinataire :</span> {{ alert.recipient.firstName }} {{ alert.recipient.lastName }}  
              (<span class="text-blue-600">{{ alert.recipient.email }}</span>) - {{ alert.recipient.service }}
            </div>
          </div>
          <button (click)="removeAlert(i)" class="bg-red-500 text-white px-3 py-1 rounded">X</button>
        </li>
      </ul>
    </div>

    <!-- Message si aucune alerte -->
    <ng-template #noAlerts>
      <p class="text-gray-500">Aucune alerte pour le moment.</p>
    </ng-template>
  </div>
  `
})
export class NotificationComponent {
  alerts = [
    { 
      email: 'phishing@danger.com', 
      reason: 'Lien suspect détecté', 
      date: new Date(),
      recipient: { 
        firstName: 'Jean', 
        lastName: 'Dupont', 
        email: 'jean.dupont@entreprise.com', 
        service: 'Comptabilité' 
      }
    },
    { 
      email: 'hacker@fraud.net', 
      reason: 'Tentative de vol de données', 
      date: new Date(),
      recipient: { 
        firstName: 'Marie', 
        lastName: 'Lemoine', 
        email: 'marie.lemoine@entreprise.com', 
        service: 'Ressources Humaines' 
      }
    }
  ];

  removeAlert(index: number) {
    this.alerts.splice(index, 1);
  }

  clearAllAlerts() {
    this.alerts = [];
  }
}
