import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faPencil, faAdd, faUsers, faBan, faUser,faSignOut } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Roles } from 'src/app/shared/model/Roles';
import { UrlDirectory } from '../../model/UrlDirectory';
import { Subject } from 'rxjs';
import { Users } from 'src/app/shared/model/Users';
import { AppComponent } from 'src/app/app.component';
import { DashboardHelperService } from '../../services/dashboard-helper.service';

@Component({
  selector: 'app-core-base-template',
  templateUrl: './core-base-template.component.html',
  styleUrls: ['./core-base-template.component.css']
})
export class CoreBaseTemplateComponent implements OnInit {

  faEdit = faEdit;
  faPencil = faPencil;
  faBan = faBan;
  faAdd = faAdd;
  faUser = faUser;
  faSignOut=faSignOut;

  roles = Roles;
  faUsers = faUsers;
  menuData: any = []

  userLang: string;
  urlDirectory: UrlDirectory[] = [];
  isLogin = false;
  public static urlTrace: Subject<UrlDirectory[]> = new Subject();

  constructor(private _router: Router, private _local: LocalStorageService, private _dashboardHelperService: DashboardHelperService) {
    //load user information from local storage
    this.userLang = this._local.getDefaultLanguage();
    this.user = this._local.getCurrentUser();

    //check user login 
    this.isLogin = this._local.isUserLogin();

    //set URL-Directory
    CoreBaseTemplateComponent.urlTrace.subscribe(urls => {
      this.urlDirectory = urls;
    })

    AppComponent.showNavbarEvent.next(false);

  }


  user: Users | null;
  ngOnInit(): void {
  }

  disableCard(menu: any) {
    alert('card disable : ' + menu.id);
  }


  logout() {
    this._local.logout();
    this._router.navigate(['/home']);
  }

}
