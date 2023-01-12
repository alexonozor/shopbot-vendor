import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material';
import { OrderResolver, OrdersResolver } from '../../shared/resolvers/orders.resolver';
import { OrdersService } from '../../shared/services/order.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrdersComponent,
    ListOrdersComponent,
    OrdersDetailsComponent
  ],
  imports: [
  CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [OrdersResolver, OrderResolver, OrdersService]
})
export class OrdersModule { }
