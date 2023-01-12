import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from '../shared/components/comfirm/confirm.component';
import { AuthService } from '../shared/services';
import { DashboardService } from '../shared/services/dashboard.service';
import { OrdersService } from '../shared/services/order.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/guard/auth.guard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MerchantStoreResolver } from '../shared/resolvers/merchant.resolver';
import { StoreService } from '../shared/services/store.service';
import { BusinessHoursComponent } from './business-hours/business-hours.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NotificationsService } from '../shared/services/notifications.service';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    BusinessHoursComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    DragDropModule,
    SharedModule,
    NgxMaterialTimepickerModule
  ],
  entryComponents: [
    ConfirmComponent
  ],
  
  providers: [
    // AdminGuard,
    AuthGuard,
    DashboardService,
    OrdersService,
    AuthService,
    MerchantStoreResolver,
    StoreService,
    NotificationsService
  ],

})
export class DashboardModule { }
