import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreBaseTemplateComponent } from './components/core-base-template/core-base-template.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './components/account/account.component';


@NgModule({
  declarations: [
    CoreBaseTemplateComponent,
    DashboardComponent,
    AccountComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
