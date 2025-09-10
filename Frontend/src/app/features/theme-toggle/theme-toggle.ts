import { Component, OnInit, inject } from '@angular/core';
import { ThemeStore } from '../../services/theme-store';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle implements OnInit {
  private themeStore = inject(ThemeStore);
  private _darkIcon = 'assets/images/dark.png';
  private _lightIcon = 'assets/images/light.png';

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initTheme = prefersDark ? 'dark' : 'light';
    this.themeStore.setTheme(initTheme);
  }

  themeIcon() {
    return this.themeStore.theme() === 'dark' ? this._darkIcon : this._lightIcon;
  }

  toggleTheme() {
    const toggledTheme = this.themeStore.theme() === 'dark' ? 'light' : 'dark';
    this.themeStore.setTheme(toggledTheme);
  }
}
