import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from 'src/app/shared/models/store';
import { StoreService } from 'src/app/shared/services/store.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  public store!: Store;
  public storeId!: string;
  public selectedTab = 0;

  constructor(
    private storeService: StoreService,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store = this.route.snapshot.root.firstChild?.firstChild?.data['store'] as Store;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.selectedTab = params.tab || 0;
    });
  }

  public tabChanged(event: MatTabChangeEvent) {
    const queryParams: Params = Object.assign(
      {},
      this.route.snapshot.queryParams
    );
    queryParams['tab'] = event.index;
    this.router.navigate(['.'], {
      queryParams: queryParams,
      relativeTo: this.route,
    });
  }
}
