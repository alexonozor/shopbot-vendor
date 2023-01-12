import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, tap, windowTime} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Auth, User} from '../models/auth';
import {JwtService} from './jwt.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { ActivatedRouteSnapshot, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import { Role } from '../models/role';
//import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  decodeToken: any;
  helper = new JwtHelperService();
  private hostServer: string = environment.hostServer;
  isLoggedIn: boolean = false;
  private userDetails: BehaviorSubject<null> | any;


  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {
  }

 
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }


  get currentUser() {
   const user = localStorage.getItem('user') as string
    return user ? JSON.parse(user) : undefined;
  }

  login(params:any): Observable<any> {
    return this.http.post(`${this.hostServer}/auth/login?user=merchant`, params)
  }

  saveToken(token: string): void {
    window.localStorage.setItem('token', token)
  }

  saveTenantId(tenantId: string): void {
    window.localStorage.setItem('tenantId', tenantId)
  }

  get getTenantId(): string | null {
    return localStorage.getItem('tenantId');
  }

  get getUser() {
    let user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  saveUser(user: any): void {
     let stringUser = JSON.stringify(user)
    window.localStorage.setItem('user', stringUser)
  }

  getUserByEmail(email:string): Observable <any> {
    return this.http.get(`${this.hostServer}/staffs/${email}/email`)
  }

  getMerchantByEmail(email:string): Observable <any> {
    return this.http.get(`${this.hostServer}/merchants/${email}/email`)
  }

  getToken(): string | null {
   return window.localStorage.getItem('token')
  }

  register(params:any): Observable<any> {
    return this.http.post(`${this.hostServer}/staffs`, params)
  }

  updatePassword(params:any) {
    return this.http.post(`${this.hostServer}/staffs/update/password`, params)
  }

  get getUserChanged(): Observable<any> {
      return this.userDetails.asObservable();
  }

  setUserChange(user:any) {
    return this.userDetails.next(user);
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user')
    this.router.navigate(['auth']);
  }


  loggedIn() {
    const token = this.jwtService.getToken();
    return !this.helper.isTokenExpired(token);
  }


  isShow(roles:Role[]) {
   return (roles && roles.indexOf(this.currentUser.role.name) !== -1)
  }

  


}
