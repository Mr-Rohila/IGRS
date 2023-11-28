import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDashboardMenuComponent } from './components/add-dashboard-menu/add-dashboard-menu.component';

const routes: Routes = [
  {
    path:'add-menu',
    component:AddDashboardMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GhostRoutingModule { }
