import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
    imports: [CommonModule, RouterModule],
  template: `
    <nav class="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      <h1 class="text-xl font-bold mb-4">Guardian</h1>
      <ul class="flex-1">
        <li class="py-2"><a routerLink="/" class="block hover:bg-gray-700 p-2 rounded">Dashboard</a></li>
        <li class="py-2"><a routerLink="/blacklist" class="block hover:bg-gray-700 p-2 rounded">Blacklist</a></li>
        <li class="py-2"><a routerLink="/whitelist" class="block hover:bg-gray-700 p-2 rounded">Whitelist</a></li>
        <li class="py-2"><a routerLink="/notification" class="block hover:bg-gray-700 p-2 rounded">Notifications</a></li>
        <li class="py-2"><a routerLink="/logsAndHistory" class="block hover:bg-gray-700 p-2 rounded">Logs & Historique</a></li>
        <li class="py-2"><a routerLink="/settings" class="block hover:bg-gray-700 p-2 rounded">Paramètres</a></li>
      </ul>
    </nav>
  `,
})
export class MenuComponent { }
