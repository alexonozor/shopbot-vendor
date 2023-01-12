import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification';
import { Order } from 'src/app/shared/models/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable()
export class NotificationsService {
  notifications!: any[];
  private hostServer: string = environment.hostServer;
  private notification$ = new BehaviorSubject<any>(null);
  selectedNotification$ = this.notification$.asObservable();
  public beat = new Audio('assets/notification/sound.wav');


  constructor(
    private _httpClient: HttpClient,
    private snackbar: MatSnackBar
  ) {}


  createNotification(params:any) {
    return this._httpClient.post(`${this.hostServer}/notifications`, params);
  }
  
  getNotifications(): Observable<Notification[]> {
    return this._httpClient.get<Notification[]>(`${this.hostServer}/notifications`);
  }

  getNotification(id:any): Observable<Notification> {
    return this._httpClient.get<Notification>(`${this.hostServer}/notifications/${id}`);
  }

  updateNotification(notificationId: string, params:any) {
    return this._httpClient.put(`${this.hostServer}/notifications/${notificationId}`, params);
  }

  deleteNotification(notificationId: string) {
    return this._httpClient.delete(`${this.hostServer}/notifications/${notificationId}`);
  }

  broadCast(order:any) {
    this.showNotification(order);
    this.playNotificationSound();
    this.notification$.next(order); 
  }

  showNotification(order:Order) {
    this.snackbar.openFromComponent(NotificationComponent, {
      data: order,
      horizontalPosition: 'right', 
      verticalPosition: 'top'
    })
  }

  playNotificationSound() {
    this.beat.loop = true;
    this.beat.play();
  }

  stopNotificationSound() {
    this.beat.pause();
  }
}