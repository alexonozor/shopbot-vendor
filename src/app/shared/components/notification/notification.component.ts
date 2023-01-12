import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarAction, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public title: string = ''
  public content: string = '';
  public buttonAcceptText: string = 'MUTE';
  public buttonAcceptCancel: string = 'OPEN ORDER';
  @Output() buttonAccept:  EventEmitter<any> = new EventEmitter();
  @Output() buttonCancel:  EventEmitter<any> = new EventEmitter();
  constructor(
    public dialogRef: MatSnackBarRef<any>,
    @Inject(MAT_SNACK_BAR_DATA) public data:  Order,
    public router: Router,
    public notificationService: NotificationsService
  ) {}

  ngOnInit() {}

  openOrder(order: Order) {
    this.notificationService.stopNotificationSound()
    this.router.navigate(['dashboard', 'orders', order._id, 'details']).then(page => { window.location.reload(); });
    this.dialogRef.dismiss()
  }

  cancel() {
    this.notificationService.stopNotificationSound();
    this.dialogRef.dismiss();
  }

}
