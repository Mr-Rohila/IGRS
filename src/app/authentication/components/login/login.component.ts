import { Component, OnInit } from '@angular/core';
import { faUser, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { Roles } from 'src/app/shared/model/Roles';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Users } from 'src/app/shared/model/Users';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  roles: Roles[] = [Roles.GHOST,
  Roles.SUPERADMIN,
  Roles.ADMIN,
  Roles.REGISTERED,
  ];

  selectedRole: Roles = Roles.REGISTERED;
  errorMessage: string | null = null;
  constructor(private _authService: AuthService, private _router: Router, private _localStorageService: LocalStorageService, private _activeRouter: ActivatedRoute, private httpClient: HttpClient) { }

  username: string = '';
  password: string = '';

  ngOnInit(): void {
    //try to auto login

  }

  onSubmit() {
    //this.doLoginLocalUser(this.username, this.password);
    this.doLoginOnServer(this.username, this.password);
  }

  onReset() {
    this.username = '';
    this.password = '';
  }

  doLoginLocalUser(username: string, password: string) {
    this.errorMessage = null;
    this.httpClient.get('/assets/json/webUser.json').subscribe({
      next: (response: any) => {

        var user = response.find((user: any) => user.mobileNo == username || user.email == username);
        if (user == null) {
          this.errorMessage = "User not found";
          return;
        }
        if (user != null && user.password != password) {
          this.errorMessage = "Invalid Password";
          return;
        }
        //login success
        this._localStorageService.setCurrentUser(user)
        var url = this._activeRouter.snapshot.queryParamMap.get('returnUrl') || '/user/dashboard';
        this._router.navigate([url]);
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', "User not found", "error");
      }
    })
  }

  doLoginOnServer(username: string, password: string) {
    this.errorMessage = null;
    this._authService.loginWith(username, password).subscribe(response => {

      var authorization = response?.headers.get('Authorization');
      if (authorization != null && authorization != undefined) {
        //login success
        var user = this.extractUserFromToken(authorization);
        this._localStorageService.setToken(authorization);
        this._localStorageService.setCurrentUser(user)
        //redirect user dashboard
        var url = this._activeRouter.snapshot.queryParamMap.get('returnUrl') || '/user/dashboard';
        //event
        this._router.navigate([url]);
      }
      else {
        this.errorMessage = 'login failed';
      }
    }, error => {
      if (error == null || error == undefined || error.status == 0)
        this.errorMessage = "Server offline, Try after some time."
      else
        this.errorMessage = error.error.message;
    });
  }
  extractUserFromToken(token: string): any {
    try {
      var data = <any>jwt_decode(token);
      var user: Users = {
        username: data.username,
        roles: [data.authorities]
      }
      return user;
    } catch (Error) {
      return null;
    }
  }
}