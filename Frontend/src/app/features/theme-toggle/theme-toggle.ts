import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle implements OnInit {
  private _theme = signal<'light' | 'dark'>('dark'); // Private, Writable, "Setter" or Setting Mechanism
  theme = this._theme.asReadonly(); // Public, Read-Only, "Getter" or Getting Mechanism

  private _lightIcon = 'assets/light.png';
  private _darkIcon = 'assets/dark.png';

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initTheme = prefersDark ? 'dark' : 'light';
    this._theme.set(initTheme);
    document.documentElement.style.setProperty('color-scheme', initTheme);
  }

  themeIcon() {
    return this.theme() === 'dark' ? this._darkIcon : this._lightIcon;
  }

  toggleTheme() {
    const toggledTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this._theme.set(toggledTheme);
    document.documentElement.style.setProperty('color-scheme', toggledTheme);
  }
}
