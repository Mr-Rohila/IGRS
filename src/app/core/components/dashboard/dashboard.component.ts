import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPencil, faTrash, faAdd, faUsers, faBan } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Roles } from 'src/app/shared/model/Roles';
import { UrlDirectory } from '../../model/UrlDirectory';
import { Subject } from 'rxjs';
import { Users } from 'src/app/shared/model/Users';
import { AppComponent } from 'src/app/app.component';
import { DashboardHelperService } from '../../services/dashboard-helper.service';
import { CoreBaseTemplateComponent } from '../core-base-template/core-base-template.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faEdit = faEdit;
  faPencil = faPencil;
  faBan = faBan;
  faAdd = faAdd;
  roles = Roles;
  faUsers = faUsers;
  menuData: any = []

  userLang: string;
  urlDirectory: UrlDirectory[] = [];
  public static urlTrace: Subject<UrlDirectory[]> = new Subject();

  constructor(private _router: Router, private _local: LocalStorageService, private _dashboardHelperService: DashboardHelperService, private _httpClient: HttpClient) {
    //load user information from local storage
    this.userLang = this._local.getDefaultLanguage();
    this.user = this._local.getCurrentUser();
    //set URL-Directory
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }]);
  }

  user: Users | null;
  ngOnInit(): void {
    //this.loadDashboardFromLocal();
    this.loadDashboardFromServer();
  }

  loadDashboardFromLocal() {
    this._httpClient.get('/assets/json/dashboard.json').subscribe({
      next: (response: any) => {
        response.forEach(element => {
          if (this.user?.roles.some(userRole => element.roles.includes(userRole))) {
            this.menuData.push(element);
          }
        });
      }
    })
  }

  loadDashboardFromServer() {
    //load dashboard menu
    this._dashboardHelperService.loadDashboard().subscribe({
      next: (response: any) => {
        this.menuData = response.MenuModel;
      },
      error: error => {
        console.log(error);
      }
    });
  }



  disableCard(menu: any) {
    alert('card disable : ' + menu.id);
  }

  logout() {
    this._local.logout();
    this._router.navigate(['/home']);
  }

}
