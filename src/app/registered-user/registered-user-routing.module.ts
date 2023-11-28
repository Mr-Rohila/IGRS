import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDeedComponent } from './components/search-deed/search-deed.component';
import { PreviousDeedComponent } from './components/previous-deed/previous-deed.component';
import { ProtecteLinkGuard } from '../helper/guard/protecte-link.guard';
import { QueryComponent } from './components/query/query.component';

const routes: Routes = [

  {
    path: 'create-new-request',
    component: SearchDeedComponent,
    canActivate:[ProtecteLinkGuard]
  },

  {
    path: 'show-request-list',
    component: PreviousDeedComponent,
    canActivate:[ProtecteLinkGuard]
  },
  {
    path:'query',
    component:QueryComponent,
    canActivate:[ProtecteLinkGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteredUserRoutingModule { }
