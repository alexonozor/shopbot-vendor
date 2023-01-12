import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Cuisine } from '../models/cuisine';
import { CuisinesService } from '../services/cuisines.service';

@Injectable({
  providedIn: 'root'
})

export class CuisinesResolver implements Resolve<Cuisine[]> {
  constructor(private cuisineService: CuisinesService) {}

  resolve(): Observable<Cuisine[]> {
    return this.cuisineService.getCuisines();
  }
}


@Injectable({
  providedIn: 'root'
})

export class CuisineResolver implements Resolve<Cuisine> {
  constructor(private cuisineService: CuisinesService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Cuisine> {
    const id = route.paramMap.get('id')
    return this.cuisineService.getCuisine(id);
  }
}