import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import API_URls from 'src/app/app-constance/API_URLs';
import baserUrl from 'src/app/helper/baserUrl';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _http: HttpClient, private _local: LocalStorageService) { }


  public restPassSendOTP(mobileNo: string) {
    return this._http.post(`${baserUrl}` + API_URls.VERIFICATION.REST_PASS_SEND_OTP, null, {
      params: {
        "param": "91" + mobileNo
      }
    });
  }

  public restPasswordSave(mobileNo: string, password: string) {
    return this._http.post(`${baserUrl}` + API_URls.VERIFICATION.REST_PASS_SAVE, null, {
      params: {
        "param": "91" + mobileNo,
        "pass": password
      }
    });
  }


  public sendOTP(mobileNo: string) {
    return this._http.get(`${baserUrl}` + API_URls.VERIFICATION.SEND_OTP, {
      params: {
        "mobileNumber": '91' + mobileNo
      }
    });
  }
  public loginWith(username: string, password: string) {
    return this._http.post(`${baserUrl}` + API_URls.CORE.LOGIN, {
      'mobileNo': username,
      'password': password
    }, {
      observe: "response"
    });
  }

  public registred(model: any, mobileValidate: string) {
    return this._http.post(`${baserUrl}` + API_URls.VERIFICATION.REGISTER, null, {

      params: {
        'logonId': model.email,
        'logonPassword': model.password,
        'logonMatchPassword': model.confirmPassword,
        'mobileNo': model.mobileNo,
        'mobileVerified': mobileValidate
      }
    });
  }

  public checkIsLogin(): boolean {
    return this._local.isUserLogin();
  }
}
