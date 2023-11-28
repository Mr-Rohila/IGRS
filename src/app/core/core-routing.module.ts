import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoreBaseTemplateComponent } from './components/core-base-template/core-base-template.component';
import { ProtecteLinkGuard } from '../helper/guard/protecte-link.guard';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {
    path: '',
    component: CoreBaseTemplateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ProtecteLinkGuard]
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [ProtecteLinkGuard]
      }
    ]
  },

  {
    path: 'register',
    component: CoreBaseTemplateComponent,
    loadChildren: () => import('../registered-user/registered-user.module').then(m => m.RegisteredUserModule)
  },

  {
    path: 'admin',
    component: CoreBaseTemplateComponent,
    // canActivate: [ProtecteLinkGuard],
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
  },

  {
    path: 'ghost',
    component: CoreBaseTemplateComponent,
    canActivate: [ProtecteLinkGuard],
    loadChildren: () => import('../ghost/ghost.module').then(m => m.GhostModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
