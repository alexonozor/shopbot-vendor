import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {
  }

  getToken():any {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  destroyToken(): void {
    localStorage.removeItem('token');
  }

  hasValidAccessToken(): boolean {
    return !new JwtHelperService().isTokenExpired(this.getToken());
  }

  getTokenExpirationDate() {
    return new JwtHelperService().getTokenExpirationDate(this.getToken());
  }
}
