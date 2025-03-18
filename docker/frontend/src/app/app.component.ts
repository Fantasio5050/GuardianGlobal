import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layer/header/header.component';
import { MenuComponent } from './layer/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuComponent],
  template: `
  <div class="flex h-screen">
    <!-- Sidebar (Menu) -->
    <app-menu class="w-64 h-screen bg-gray-800 text-white"></app-menu>

    <!-- Contenu Principal -->
    <div class="flex-1 flex flex-col">
      <app-header></app-header>
      <main class="flex-1 p-6 overflow-auto bg-gray-100 dark:bg-gray-900">
        <router-outlet></router-outlet>
      </main>
    </div>
  </div>
  `,
})
export class AppComponent {
  title = 'Guardian';
}
