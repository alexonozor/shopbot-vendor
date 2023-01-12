import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { MenusService } from '../../list/menus.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/shared/models/menu';

@Component({
  selector: 'app-edit-menus',
  templateUrl: './edit-menus.component.html',
  styleUrls: ['./edit-menus.component.scss']
})
export class EditMenusComponent implements OnInit {
  menuForm: FormGroup | any;
  isLoading: boolean = false;
  activeDays: any;
  public panelOpenState: boolean = false
  public availableDays = [
    { day: "Sunday", active: false, from: "09:00:00", to: "20:00:00" },
    { day: "Monday", active: false, from: '09:00:00', to: '20:00:00' },
    { day: "Tuesday", active: false, from: '09:00:00', to: '20:00:00' },
    { day: "Wednesday", active: false, from: '09:00:00', to: '20:00:00' },
    { day: "Thursday", active: false, from: '09:00:00', to: '20:00:00' },
    { day: "Friday", active: false, from: '09:00:00', to: '20:00:00' },
    { day: "Saturday", active: false, from: '09:00:00', to: '20:00:00' }
  ]

  // friday: { active: Boolean, time: { from: String, to: String } },
  // monday: { active: Boolean, time: { from: String, to: String } },
  // saturday: { active: Boolean, time: { from: String, to: String } },
  // sunday: { active: Boolean, time: { from: String, to: String } },
  // thursday: { active: Boolean, time: { from: String, to: String } },
  // tuesday: { active: Boolean, time: { from: String, to: String } },
  // wednesday: { active: Boolean, time: { from: String, to: String } },


  public filteredDays: any[] = [];
  private storeId!: string;
  public menu: Menu;

  constructor(
    private _formBuilder: FormBuilder,
    private menusService: MenusService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.storeId = this.data.storeId;
    this.menu = this.data.menu as Menu;
  }

  ngOnInit() {
    this.filteredDays = this.filteredDate;
    this.menuForm = this.createMenuForm();
    this.activeDays = this.computeSelectedDays(this.filteredDays)
  }

  createMenuForm(): FormGroup {
    return this._formBuilder.group({
      name: [this.menu.name, Validators.required],
      store: [this.storeId, Validators.required],
      description: [this.menu.description, Validators.required]
    });
  }

  save() {
    this.isLoading = true;
    this.menusService.updateMenu(this.menu._id, { ...this.menuForm.getRawValue(), ...this.activeDays })
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe((data) => {
        this.isLoading = true;
        this.dialogRef.close(true);
      })
  }

  checked(item: any, e: any) {
    item.active = e.checked;
    this.filteredDays = this.availableDays.filter((item) => {
      return item.active;
    });
    this.activeDays = this.computeSelectedDays(this.filteredDays)
  }

  get filteredDate() {
    let activeDaysKeys = Object.keys(this.menu.daysActive)
    let days: any[] = [];
    activeDaysKeys.forEach((key) => {
      let foundDays = this.availableDays.find((availableDay) => {
        if (availableDay.day.toLowerCase() == key) {
          availableDay.active = true;
          availableDay.from = this.menu.daysActive[key].time.from;
          availableDay.to = this.menu.daysActive[key].time.to;
          return true;
        } else {
          return false;
        }
      })
      days.push(foundDays);
    })
    let final = [...this.availableDays, ...days]
    this.availableDays = [...new Set( final.map(obj => obj))];
    return this.availableDays.filter((item) => {
      return item.active;
    })

  }

  computeSelectedDays(filteredDays: any) {
    let days = {} as any
    for (let i = 0; i < this.filteredDays.length; i++) {
      let each = this.filteredDays[i];
      let a = {
        active: each.active,
        day: each.day.toLowerCase(),
        time: {
          from: each.from,
          to: each.to
        }
      }
      days[each.day.toLowerCase()] = a;
    }
    return { daysActive: days }
  }

  changeTime(e: any, day: any, side: any) {
    day[side] = e.target.value;
    this.activeDays = this.computeSelectedDays(this.filteredDays)
  }

}
