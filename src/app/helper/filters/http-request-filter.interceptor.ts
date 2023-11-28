import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable()
export class HttpRequestFilterInterceptor implements HttpInterceptor {

  constructor(private _localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userLang = this._localStorage.getDefaultLanguage();

    //get token form local storage
    var token = this._localStorage.getToken();

    var req = request.clone({
      setHeaders: {
        'userLang': userLang == null ? 'en' : userLang,
        'Authorization': token == null ? '' : token
      }
    });
    return next.handle(req);
  }
}

export const requestProvider = [{
  provide: HTTP_INTERCEPTORS,
  useClass: HttpRequestFilterInterceptor,
  multi: true,
}]