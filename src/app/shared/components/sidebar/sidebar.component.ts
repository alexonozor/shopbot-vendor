import {Component, OnInit} from '@angular/core';
import {NgProgress} from "@ngx-progressbar/core";
import {ProgressBarService} from "../../services/progress-bar.service";
import {AuthService, JwtService} from "../../services";
import {AlertService} from "ngx-alerts";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
              public authService: AuthService,
              private jwtService: JwtService,
) {
  }

  ngOnInit(): void {
  }

}
