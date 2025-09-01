import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private _theme = signal<'light' | 'dark'>('dark');
  theme = this._theme.asReadonly();

  private _lightIcon = 'assets/light.png';
  private _darkIcon = 'assets/dark.png';

  themeIcon() {
    return this.theme() === 'dark' ? this._darkIcon : this._lightIcon;
  }

  toggleTheme() {
    const toggledTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(toggledTheme);
  }
}
