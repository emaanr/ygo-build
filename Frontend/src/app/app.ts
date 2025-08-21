import { HttpClient } from '@angular/common/http';
import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('Yu-Gi-Oh! Build');
  protected users = signal<any>([]);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => this.users.set(response),
      error: (error) => console.log(error),
      complete: () => console.log('Completed the http request'),
    });
  }

  // Alternative method
  // async ngOnInit() {
  //   this.users.set(await this.getUsers());
  // }
  // async getUsers() {
  //   try {
  //     return firstValueFrom(this.http.get('https://localhost:5001/api/users'));
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // }
}
