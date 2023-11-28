import { Component, OnInit, Input } from '@angular/core';
import { MenuModel } from 'src/app/shared/model/MenuModel';
import { Roles } from 'src/app/shared/model/Roles';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Users } from 'src/app/shared/model/Users';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: Users | null;
  selectedLang: string | null;

  admin: Roles = Roles.ADMIN;
  user: Roles = Roles.REGISTERED;

  @Input()
  isShowMenu: boolean = false;
  menuArray: MenuModel[] = []
  constructor(private _navbarService: NavbarService, private _localStorage: LocalStorageService) {
    //filter menu by user role
    this.currentUser = _localStorage.getCurrentUser();
    this.selectedLang = this._localStorage.getDefaultLanguage();
    //login user 
  }

  ngOnInit(): void {
    this.loadNavbar();
  }

  loadNavbar() {
    //updated
    if (this.isShowMenu) {
      this._navbarService.loadNavBar().subscribe({
        next: (response: any) => {
          this.menuArray = response.MenuModel;
        },
        error: err => {
          this.createDefaultMenu();
        }
      });
    }
  }


  createDefaultMenu() {
    //home menu
    var home = {
      labelEn: "Home",
      labelHi: "होम",
      url: "/",
      isActivate: true,
      child: [],
      hasChild: false,
      roles: [Roles.GUEST]
    };
    this.menuArray.push(home);

    var menuLabelEn = "Login";
    var menuLabelHi = "लॉगिन";
    if (this.currentUser) {
      menuLabelEn = "Dashboard";
      menuLabelHi = "डॅशबोर्ड";
    }
    //login menu
    var login = {
      labelEn: menuLabelEn,
      labelHi: menuLabelHi,
      url: "/user/dashboard",
      isActivate: true,
      child: [],
      hasChild: false,
      roles: [Roles.GUEST]
    };
    this.menuArray.push(login);

    var searchDeed = {
      labelEn: "Search Deed",
      labelHi: "दस्तावेज खोजे",
      url: "/user/dashboard",
      isActivate: true,
      child: [],
      hasChild: false,
      roles: [Roles.GUEST]
    };
    this.menuArray.push(searchDeed);

    //Complaint menu
    var complaint = {
      labelEn: "Register Complaint",
      labelHi: "शिकायत दर्ज करें",
      url: "/user/dashboard",
      isActivate: true,
      child: [],
      hasChild: false,
      roles: [Roles.GUEST]
    };
    this.menuArray.push(complaint);

    //Complaint menu
    var contactUs = {
      labelEn: "Contact Us",
      labelHi: "संपर्क करें",
      url: "/user/dashboard",
      isActivate: true,
      child: [],
      hasChild: false,
      roles: [Roles.GUEST]
    };
    this.menuArray.push(contactUs);
  }
}


