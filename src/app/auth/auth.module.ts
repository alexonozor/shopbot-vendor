import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatInputModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    LoginComponent
  ],
  providers: []
})
export class AuthModule { }
