import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagerComponent } from './components/user-manager/user-manager.component';
import { RevenueManagerComponent } from './components/revenue-manager/revenue-manager.component';
import { ProtecteLinkGuard } from '../helper/guard/protecte-link.guard';
import { SearchRecordComponent } from './components/search-record/search-record.component';
import { ComplainComponent } from './components/complain/complain.component';

const routes: Routes = [
  {
    path: 'user-manager',
    component: UserManagerComponent,
    canActivate: [ProtecteLinkGuard]
  },
  {
    path: 'revenue-manager',
    component: RevenueManagerComponent,
    canActivate: [ProtecteLinkGuard]
  },
  {
    path: 'search-record',
    component: SearchRecordComponent,
    canActivate: [ProtecteLinkGuard]
  },
  {
    path:'query',
    component:ComplainComponent,
    canActivate:[ProtecteLinkGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
