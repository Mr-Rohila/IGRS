import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProtecteLinkGuard implements CanActivate {
  constructor(private _local: LocalStorageService, private _router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var isLogin = this._local.isUserLogin();
    if (isLogin)
      return true;
    else {
      //save current url in local storage
      this._router.navigate(['/auth/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }

}
