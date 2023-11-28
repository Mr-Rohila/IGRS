import { NgModule } from '@angular/core';
import { HasRolesDirective } from './directive/has-roles.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@Angular/material/divider'

const importAndExport: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatSnackBarModule,
  FontAwesomeModule,
  MatButtonModule,
  MatIconModule,
  FormsModule,
  HttpClientModule,
  TranslateModule,
  MatTooltipModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatInputModule,
  MatSelectModule,
  NgxUiLoaderModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatMenuModule,
  MatDividerModule
]

@NgModule({
  declarations: [HasRolesDirective],
  imports: [
    importAndExport,
  ],
  exports: [importAndExport, HasRolesDirective]
})
export class SharedModule { }
