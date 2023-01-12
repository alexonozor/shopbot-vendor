import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})

export class PaymentsResolver implements Resolve<Payment[]> {
  constructor(private settingsService: SettingsService) {}

  resolve(): Observable<Payment[]> {
    return this.settingsService.getPayments();
  }
}


@Injectable({
  providedIn: 'root'
})

export class PaymentResolver implements Resolve<Payment> {
  constructor(private settingsService: SettingsService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Payment> {
    const id = route.paramMap.get('id')
    return this.settingsService.getPayment(id);
  }
}