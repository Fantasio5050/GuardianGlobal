import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blacklist',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-white p-6 shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4">Blacklist</h2>

    <!-- Formulaire d'ajout -->
    <div class="flex space-x-2 mb-4">
      <select #type class="border p-2 rounded">
        <option value="Email">Email</option>
        <option value="Téléphone">Téléphone</option>
      </select>
      <input #label class="border p-2 rounded" placeholder="Intitulé (raison, entreprise, etc.)">
      <input #value class="border p-2 rounded" placeholder="Adresse email / Numéro">
      <button (click)="addEntry(type.value, label.value, value.value)" class="bg-red-500 text-white p-2 rounded">
        Bloquer
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
        <tr *ngFor="let entry of blacklist; let i = index">
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
export class BlacklistComponent {
  blacklist = [
    { type: 'Email', label: 'Spam marketing', value: 'spam@example.com' },
    { type: 'Téléphone', label: 'Appel frauduleux', value: '+33 612345678' },
  ];

  addEntry(type: string, label: string, value: string) {
    if (type && value.trim()) {
      this.blacklist.push({ type, label, value });
    }
  }

  removeEntry(index: number) {
    if (index >= 0 && index < this.blacklist.length) {
      this.blacklist.splice(index, 1);
    }
  }
}
