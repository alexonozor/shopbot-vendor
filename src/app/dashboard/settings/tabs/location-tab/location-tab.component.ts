// import { MapsAPILoader } from '@agm/core';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/store';
import { Location, Appearance, GermanAddress } from '@angular-material-extensions/google-maps-autocomplete';

import PlaceResult = google.maps.places.PlaceResult;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.scss']
})
export class LocationTabComponent implements OnInit {
    @Input() store: Store | any;
    lat!: number;
    lng!: number;
    zoom: number = 13;
    generalSettingForm!: FormGroup;
    fileName!: string;
    uploadSub: any;
    product: any;
    uploadProgress!: any;
    uploadProgressBanner!: any;
    uploadSubBanner: any;
    isLoading: boolean = false;
    horizontalPosition: MatSnackBarHorizontalPosition | undefined;
    verticalPosition: MatSnackBarVerticalPosition | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private storeService: StoreService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.generalSettingForm = this.createGeneralSettingForm();

    this.getCurrentLocation();
  }

  createGeneralSettingForm(): FormGroup {
    return this._formBuilder.group({
      contactInfo: this._formBuilder.group({
        placeName: [this.store.contactInfo.placeName],
        placeNumber: [this.store.contactInfo.placeNumber]
      }),

      location: this._formBuilder.group({
        type: 'Point',
        coordinates: [this.store.location.coordinates]
      })
    })
  }

  

  onAutocompleteSelected(location: any) {
    this.generalSettingForm.patchValue({contactInfo: { placeName: location.formatted_address} })
    this.generalSettingForm.patchValue({contactInfo: { placeNumber: location.formatted_address} })
  }

  onLocationSelected(location: any) {
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.generalSettingForm.patchValue({ location: { coordinates: [this.lat, this.lng] } });
    
    
  }


  save() {
    this.isLoading = true;
    this.store.paused = !this.store.paused;
    this.storeService.saveStore(this.generalSettingForm.getRawValue(), this.store._id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((store) => {
        this._snackBar.open('Saved', 'ok', {
          duration: 5000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
       
      })
  }

  setCurrentLocation() {
     if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
           this.lat = position.coords.latitude;
           this.lng = position.coords.longitude;
           this.zoom = 13;
           this.generalSettingForm.patchValue({ location: { coordinates: [this.lat, this.lng] } })
         });
       }
    
    
   }

  getCurrentLocation() {
   if (this.store.location.coordinates.length > 0) {
    this.lat = this.store.location.coordinates[0];
    this.lng = this.store.location.coordinates[1];
    this.zoom = 13;
   } else {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 13;
          this.generalSettingForm.patchValue({ location: { coordinates: [this.lat, this.lng] } })
        });
      }
   }
   
  }

}
