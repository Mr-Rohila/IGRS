import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CoreBaseTemplateComponent } from '../core-base-template/core-base-template.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Users } from 'src/app/shared/model/Users';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  faEdit = faEdit;

  userLang: string;
  user: Users | null;

  constructor(private _local: LocalStorageService) {
    //load user information from local storage
    this.userLang = this._local.getDefaultLanguage();
    this.user = this._local.getCurrentUser();
    //set URL-Directory
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: 'Account', url: '/user/account' }]);
    this.passwordEditable = false;

  }

  emailId = " test@Gmail.com";
  mobileNo = "8958019324";
  password = "********************"
  passwordEditable = false;
  newPassword = "";
  confirmPassword = "";
  passwordWarnMsg: any = null;
  message: any = null;

  ngOnInit(): void {
  }
  onChangePassword() {
    this.passwordEditable = true;
  }

  checkErrorMessage() {
    if (this.confirmPassword != this.newPassword) {
      this.passwordWarnMsg = "*Passwords do not match";
    } else {
      this.passwordWarnMsg = null;
    }
  }


}
