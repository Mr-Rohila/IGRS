import { NgModule } from '@angular/core';

import { RegisteredUserRoutingModule } from './registered-user-routing.module';
import { SearchDeedComponent } from './components/search-deed/search-deed.component';
import { PreviousDeedComponent } from './components/previous-deed/previous-deed.component';
import { SharedModule } from '../shared/shared.module';
import { ByOwnerNameComponent } from './search-form-group/by-owner-name/by-owner-name.component';
import { ByKhasraNoComponent } from './search-form-group/by-khasra-no/by-khasra-no.component';
import { ByRegistrationYearComponent } from './search-form-group/by-registration-year/by-registration-year.component';
import { AdvanceFormComponent } from './search-form-group/advance-form/advance-form.component';
import { QueryComponent } from './components/query/query.component';
import { SearchQueryComponent } from './components/search-query/search-query.component';
import { RaisedQueryComponent } from './components/raised-query/raised-query.component';


@NgModule({
  declarations: [
    SearchDeedComponent,
    PreviousDeedComponent,
    ByOwnerNameComponent,
    ByKhasraNoComponent,
    ByRegistrationYearComponent,
    AdvanceFormComponent,
    QueryComponent,
    SearchQueryComponent,
    RaisedQueryComponent
  ],
  imports: [
    SharedModule,
    RegisteredUserRoutingModule
  ]
})
export class RegisteredUserModule { }
