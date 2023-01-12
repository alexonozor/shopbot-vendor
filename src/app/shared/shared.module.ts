import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmComponent } from './components/comfirm/confirm.component';
import { FileMediaCardComponent } from './components/file-media-card/file-media-card.component';
import { SelectMediaComponent } from './components/select-media/select-media.component';
import { MaterialModule } from '../material';
import { StatsComponent } from './components/stats/stats.component';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [
    ConfirmComponent,
    FileMediaCardComponent,
    SelectMediaComponent,
    StatsComponent,
    NoItemsComponent,
    OrderCardComponent,
    DateTimeFormatPipe,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    ConfirmComponent,
    FileMediaCardComponent,
    SelectMediaComponent,
    StatsComponent,
    NoItemsComponent,
    OrderCardComponent,
    
    DateTimeFormatPipe
  ]
})
export class SharedModule { }
