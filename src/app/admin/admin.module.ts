import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { RevenueManagerComponent } from './components/revenue-manager/revenue-manager.component';
import { SearchRecordComponent } from './components/search-record/search-record.component';
import { ComplainComponent } from './components/complain/complain.component';


@NgModule({
  declarations: [
    UserManagerComponent,
    RevenueManagerComponent,
    SearchRecordComponent,
    ComplainComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ]
})
export class AdminModule { }
