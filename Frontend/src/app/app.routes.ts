import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Page } from './components/page/page';
import { Decks } from './pages/decks/decks';
import { Simulate } from './pages/simulate/simulate';
import { Api } from './pages/api/api';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  {
    path: '',
    component: Page,
    children: [
      { path: 'decks', component: Decks },
      { path: 'simulate', component: Simulate },
      { path: 'api', component: Api },
    ],
  },
];
