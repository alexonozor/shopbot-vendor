import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MenusService } from '../../list/menus.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-menus',
  templateUrl: './add-menus.component.html',
  styleUrls: ['./add-menus.component.scss']
})
export class AddMenusComponent implements OnInit {
  menuForm: FormGroup | any;
  isLoading: boolean = false;
  activeDays:any;
  public panelOpenState: boolean = false
  public availableDays = [
      { day: "Sunday", active: true, from: "09:00:00", to: "20:00:00" },
      { day: "Monday", active: true, from: '09:00:00', to: '20:00:00' },
      { day: "Tuesday", active: true, from: '09:00:00', to: '20:00:00' },
      { day: "Wednesday", active: true, from: '09:00:00', to: '20:00:00' },
      { day: "Thursday", active: true, from: '09:00:00', to: '20:00:00' },
      { day: "Friday", active: true, from: '09:00:00', to: '20:00:00' },
      { day: "Saturday", active: true, from: '09:00:00', to: '20:00:00' }
    ]
  
  public filteredDays: any[] =[];

  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private menusService: MenusService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.filteredDays = this.filteredDate;
    this.menuForm = this.createMenuForm();
    this.activeDays = this.computeSelectedDays(this.filteredDays)
  }



  createMenuForm(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      store: [this.data.storeId, Validators.required],
      description: ['', Validators.required]
    });
  }


  save() {
    this.isLoading = true;
    this.menusService.createMenu({...this.menuForm.getRawValue(), ...this.activeDays})
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe((data) => {
        this.isLoading = true;
        this.dialogRef.close(true);
      })
  }

  checked(item:any, e:any) {
    item.active = e.checked;
    this.filteredDays = this.filteredDate;
    this.activeDays = this.computeSelectedDays(this.filteredDays)
  }

  get filteredDate() {
   return this.availableDays.filter((item) => item.active)
  }

  computeSelectedDays(filteredDays:any) {
    let days = {} as any
    for(let i=0; i < this.filteredDays.length; i++) {
      let each = this.filteredDays[i]
      let a = {
         day: each.day.toLowerCase(),
        active: each.active, 
        time: {
          from: each.from, 
          to: each.to 
         }
       } 
       days[each.day.toLowerCase()] = a;
    }
   return { daysActive: days }
  }

  changeTime(e:any, day:any, side:any) {
   day[side] =  e.target.value
  }

}
