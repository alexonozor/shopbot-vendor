import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification';
import { NotificationsService } from '../services/notifications.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationsResolver implements Resolve<Notification[]> {
  constructor(private notificationService: NotificationsService) {}

  resolve(): Observable<Notification[]> {
    return this.notificationService.getNotifications();
  }
}


@Injectable({
  providedIn: 'root'
})

export class NotificationResolver implements Resolve<Notification> {
  constructor(private notificationService: NotificationsService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Notification> {
    const id = route.paramMap.get('id')
    return this.notificationService.getNotification(id);
  }
}