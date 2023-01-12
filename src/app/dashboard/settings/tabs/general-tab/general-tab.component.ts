// import { MapsAPILoader } from '@agm/core';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/store';
// import PlaceResult = google.maps.places.PlaceResult;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-general-settings-tab',
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.scss']
})
export class GeneralTabComponent implements OnInit {
  @Input() store: Store | any;
  lat = 51.678418;
  lng = 7.809007;
  zoom: number = 8;
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
    this.lat = this.store.location.coordinates[0];
    this.lng = this.store.location.coordinates[1];
    this.generalSettingForm = this.createGeneralSettingForm();
  }

  createGeneralSettingForm(): FormGroup {
    return this._formBuilder.group({
      logo: [this.store.logo],
      bannerImage: [this.store.bannerImage],
      name: [this.store.name, Validators.required],
      description: [this.store.description, Validators.required],
      currency: [this.store.currency, Validators.required],

      notifications: this._formBuilder.group({
        email: [this.store.notifications.email],
        phone: [this.store.notifications.phone],
        sms: [this.store.notifications.sms],
      }),

      contactInfo: this._formBuilder.group({
        email: [this.store.contactInfo.email, [Validators.required]],
        phone: [this.store.contactInfo.phone, [Validators.required]],
        city: [this.store.contactInfo.city],
        country: [this.store.contactInfo.country],
        state: [this.store.contactInfo.state],
        postalCode: [this.store.contactInfo.postalCode],
        placeName: [this.store.contactInfo.placeName],
        placeNumber: [this.store.contactInfo.placeNumber]
      }),

      location: this._formBuilder.group({
        type: 'Point',
        coordinates: [this.store.location.coordinates]
      })
    })
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.generalSettingForm.patchValue({ location: { coordinates: [this.lat, this.lng] } })
      });
    }
  }

  onAutocompleteSelected(result: any) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    // this.lat = location.latitude;
    // this.lng = location.longitude;
    // this.generalSettingForm.patchValue({ location: { coordinates: [this.lat, this.lng] } })
  }



  onFileLogoSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.storeService.uploadLogo(formData, this.store._id)
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } else if (event.hasOwnProperty('body')) {
          this.store.logo = event.body.photo;
          this.createGeneralSettingForm().patchValue({logo: event.body.photo })
        }
      })
    }

  }

  onFileBannerSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      const upload$ = this.storeService.uploadBanner(formData, this.store._id)
        .pipe(
          finalize(() => this.resetBanner())
        );
      this.uploadSubBanner = upload$.subscribe((event :any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgressBanner = Math.round(100 * (event.loaded / event.total));
        } else if (event.hasOwnProperty('body')) {
          this.store.bannerImage = event.body.photo;
          this.createGeneralSettingForm().patchValue({bannerImage: event.body.photo })
        }
      })
    }
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

  resetBanner() {
    this.uploadProgressBanner = null;
    this.uploadSubBanner = null;
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
