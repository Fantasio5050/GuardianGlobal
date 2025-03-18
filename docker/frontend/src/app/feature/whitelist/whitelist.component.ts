import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-whitelist',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-white p-6 shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4">Whitelist</h2>

    <!-- Formulaire d'ajout -->
    <div class="flex space-x-2 mb-4">
      <select #type class="border p-2 rounded">
        <option value="email">Email</option>
        <option value="phone">Téléphone</option>
      </select>
      <input #label class="border p-2 rounded" placeholder="Intitulé (raison, entreprise, etc.)">
      <input #value class="border p-2 rounded" placeholder="Adresse email / Numéro">
      <button (click)="addEntry(type.value, label.value, value.value)" class="bg-green-500 text-white p-2 rounded">
        Ajouter
      </button>
    </div>

    <!-- Tableau des entrées -->
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2 text-left">Type</th>
          <th class="p-2 text-left">Intitulé</th>
          <th class="p-2 text-left">Valeur</th>
          <th class="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let entry of whitelist; let i = index">
          <td class="p-2">{{ entry.type }}</td>
          <td class="p-2">{{ entry.label }}</td>
          <td class="p-2">{{ entry.value }}</td>
          <td class="p-2">
            <button (click)="removeEntry(i)" class="bg-red-500 text-white p-2 rounded">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class WhitelistComponent {
  whitelist = [
    { type: 'email', label: 'Client VIP', value: 'trusted@company.com' },
    { type: 'phone', label: 'Contact Support', value: '+33 689745612' },
  ];

  addEntry(type: string, label: string, value: string) {
    if (type && value.trim()) {
      this.whitelist.push({ type, label, value });
    }
  }

  removeEntry(index: number) {
    if (index >= 0 && index < this.whitelist.length) {
    this.whitelist.splice(index, 1);
    }
  }
}
