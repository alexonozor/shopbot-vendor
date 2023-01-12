import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
declare var require: any;

// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  order!: Order;
  isCanceling!: boolean;
  isAccepting!: boolean;
  orderId: string;
  statuses = [
    { id: 0, name: "Accepted", color: "text-yellow-700"},
    { id: 1, name: "Preparing", color: "text-blue-500"},
    { id: 2, name: "Ready for Pickup", color: "text-blue-500"},
    { id: 4, name: "Shipped", color: "text-blue-500"},
    { id: 3, name: "Canceled", color: "text-red-500"},
    { id: 5, name: "Delivered", color: "text-green-500"},
  ]

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private _matDialog: MatDialog,
    private _matSnack: MatSnackBar,
    private router: Router
  ) { 
    this.orderId = this.route.snapshot.params['id'];
    
    this.getOrder(this.orderId)
  }

  ngOnInit(): void {
    
  }

  getOrder(id:string) {
    this.orderService.getOrder(id).subscribe((order) => {
      this.order = order;
    })
  }


  optionsPrice(options:any): number {
    return options.reduce((sum:any, currentItem:any) => {
      return sum + (currentItem.price * currentItem.quantity);
    }, 0)
  }

  accept(order:Order) {
    this.isAccepting = true;
    this.updateStatus({ id: 0, name: "Accepted", color: "text-yellow-700"}, order, false)
    order.category =  'Processing'
  }

  cancelOrder(order:Order) {
    this.isCanceling = true;
    this.updateStatus({ id: 3, name: "Canceled", color: "text-red-500"}, order, false)
    order.category =  'Canceled'
  }

  updatePaymentStatus(order: Order, event:any) {
    this.orderService.updateOrder(order._id, {paymentStatus: event.value })
    .pipe(finalize(() => this.isCanceling = false) )
    .subscribe((data) => {
      order.paymentStatus =  event.value
      this._matSnack.open('Payment updated!', 'Close', {duration: 3000})
    })
  }

  markAsReady(order:Order) {
    this.isAccepting = true;
    this.updateStatus(this.statuses[2], order, false)
  }

  compareFn(t1: any, t2: any): boolean { 
    return t1 && t2 ? t1.name === t2 : t1.name === t2;
  }

  updateStatus(event:any, order:any, eventType = true) {
    this.orderService.updateOrderStatus(order._id, order.user._id, eventType?  event.value :  event).subscribe((data:any) => {    
      this.isCanceling = false;
      this.isAccepting = false;
      order.status.push(event);
      this.getOrder(this.orderId);
      this._matSnack.open(`You have updated this order to ${event.name}`, 'Close', {duration: 3000})
    })
  }

  // public exportPDF() {
  //   const pdfTable = this.pdfTable.nativeElement;
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).download(); 
     
  // }


  back() {
    this.router.navigate(['dashboard', 'home'])
  }

}
