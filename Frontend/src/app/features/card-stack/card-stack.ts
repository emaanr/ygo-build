import { Component, inject } from '@angular/core';
import { ThemeStore } from '../../services/theme-store';

@Component({
  selector: 'app-card-stack',
  imports: [],
  templateUrl: './card-stack.html',
  styleUrl: './card-stack.scss',
})
export class CardStack {
  private themeStore = inject(ThemeStore);
  private _darkCard = 'assets/images/44405066.jpg';
  private _lightCard = 'assets/images/40908371.jpg';

  src() {
    return this.themeStore.theme() === 'dark' ? this._darkCard : this._lightCard;
  }
}
