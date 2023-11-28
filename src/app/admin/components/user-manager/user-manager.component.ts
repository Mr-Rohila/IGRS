import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/shared/model/UserDto';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserManagerService } from '../../services/user-manager.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  userLang: string;
  constructor(private _userManagerService: UserManagerService, _local: LocalStorageService) {
    this.userLang = _local.getDefaultLanguage();
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: "Users", url: "/user/admin/user-manager" }])

  }

  listOfRoles = [
    "SUPERADMIN", "ADMIN", "USER"
  ]

  listOfDistrict: any[] = [];
  listOfSubDistrict: any[] = []


  displayedColumns =
    ['username', 'roles', 'mobileNo', 'email', 'district', 'subDistrict', 'status', 'action'];

  dataSource: UserDto[] = [];

  ngOnInit(): void {
    this.loadDistrictList();
    this.loadUserList();
  }

  loadDistrictList() {
    this._userManagerService.loadDistrictList().subscribe({
      next: (response: any) => {
        this.listOfDistrict = response;
      },
      error: (error) => {

      }
    })
  }

  onDistrictChange(district: string) {
    alert(district);
    //this.loadSubDistrictList(district);
  }

  loadSubDistrictList(district: string) {
    this._userManagerService.loadSubDistrictList(district).subscribe(
      {
        next: (response: any) => {
          this.listOfSubDistrict = response;
        },
        error: (error) => {
        }
      }
    );
  }


  loadUserList() {
    this._userManagerService.loadUserList().subscribe({
      next: (response: any) => {
        this.dataSource = response;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

}
