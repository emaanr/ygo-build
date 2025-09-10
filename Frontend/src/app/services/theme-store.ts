import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeStore {
  private _theme = signal<'light' | 'dark'>('dark'); // Private, Writable, "Setter" or Setting Mechanism
  theme = this._theme.asReadonly(); // Public, Read-Only, "Getter" or Getting Mechanism

  setTheme(newTheme: 'light' | 'dark') {
    this._theme.set(newTheme);
    document.documentElement.style.setProperty('color-scheme', newTheme);
  }
}
