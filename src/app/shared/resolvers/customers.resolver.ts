import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})

export class UsersResolver implements Resolve<User[]> {
  constructor(private userService: UsersService) {}

  resolve(): Observable<User[]> {
    return this.userService.getUsers();
  }
}


@Injectable({
  providedIn: 'root'
})

export class UserResolver implements Resolve<User> {
  constructor(private userService: UsersService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = route.paramMap.get('id')
    return this.userService.getUser(id);
  }
}
