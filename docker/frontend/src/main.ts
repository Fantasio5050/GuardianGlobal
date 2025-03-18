import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './app/feature/home/home.component';
import { BlacklistComponent } from './app/feature/blacklist/blacklist.component';
import { WhitelistComponent } from './app/feature/whitelist/whitelist.component';
import { ErrorComponent } from './app/layer/error/error.component';
import { NotificationComponent } from './app/feature/notification/notification.component';
import { LogsAndHistoryComponent } from './app/feature/logs-and-history/logs-and-history.component';
import { ParametresComponent } from './app/feature/parametres/parametres.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blacklist', component: BlacklistComponent },
  { path: 'whitelist', component: WhitelistComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'logsAndHistory', component: LogsAndHistoryComponent },
  { path: 'settings', component: ParametresComponent },
  { path: '**', component: ErrorComponent, pathMatch: 'full' } 
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]
}).catch(err => console.error(err));