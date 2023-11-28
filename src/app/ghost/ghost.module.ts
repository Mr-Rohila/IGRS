import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GhostRoutingModule } from './ghost-routing.module';
import { AddDashboardMenuComponent } from './components/add-dashboard-menu/add-dashboard-menu.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AddDashboardMenuComponent
  ],
  imports: [
    SharedModule,
    GhostRoutingModule
  ]
})
export class GhostModule { }
