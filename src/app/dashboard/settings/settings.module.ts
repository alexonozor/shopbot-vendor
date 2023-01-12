import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from 'src/app/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './settings.routing';
import { StoreService } from 'src/app/shared/services/store.service';
import { AuthService } from 'src/app/shared/services';
import { GeneralTabComponent } from './tabs/general-tab/general-tab.component';
import { LocationTabComponent } from './tabs/location-tab/location-tab.component';
import { NotificationTabComponent } from './tabs/notification-tab/notification-tab.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    SettingsComponent,
    GeneralTabComponent,
    LocationTabComponent,
    NotificationTabComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBTzycQbUj9vWxnq8VgI7pzmYxdEo6t8to',
        libraries: ['places']
      }),
      MatGoogleMapsAutocompleteModule
  ],
  
  
  providers: [
    AuthService,
    StoreService
  ],

})
export class SettingsModule { }
