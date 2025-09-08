import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CardStack } from '../../features/card-stack/card-stack';

@Component({
  selector: 'app-home',
  imports: [CardStack],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
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
