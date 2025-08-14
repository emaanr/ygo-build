import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './components/page/page.component';
import { DecksComponent } from './pages/decks/decks.component';
import { SimulateComponent } from './pages/simulate/simulate.component';
import { ApiComponent } from './pages/api/api.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: PageComponent,
    children: [
      { path: 'decks', component: DecksComponent },
      { path: 'simulate', component: SimulateComponent },
      { path: 'api', component: ApiComponent },
    ]
  }
];