import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API_URls from 'src/app/app-constance/API_URLs';
import baserUrl from 'src/app/helper/baserUrl';

@Injectable({
  providedIn: 'root'
})
export class SearchDeedService {

  constructor(private _http: HttpClient) { }

  public loadDistrictList() {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_DISTRICT);
  }


  public loadRegistrationDistrict(districtId: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_REGISTRATION_DISTRICT, {
      params: {
        "q": "registrationDistrict",
        "districtId": districtId
      }
    });
  }

  public loadSRLocation(districtId: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_SR_LOCATION, {
      params: {
        "q": "sRLocation",
        "districtId": districtId
      }
    });
  }
  public loadRevenueDistrict(districtId: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_REVENUE_DISTRICT, {
      params: {
        "q": "revenueDistrict",
        "districtId": districtId
      }
    });
  }


  public loadTehsil(districtId: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_TEHSIL, {
      params: {
        "q": "tehsil",
        "districtId": districtId
      }
    });
  }

  public loadVillage(districtId: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_VILLAGE, {
      params: {
        "q": "villageName",
        "districtId": districtId
      }
    });
  }

  public loadYear() {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_YEAR);
  }

  loadOwnerName(districtId: string, tehsilId: string, villageId: string, yearId: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.LOAD_OWNERS_NAME, {
      params: {
        "districtId": districtId,
        "tehsilId": tehsilId,
        "villageId": villageId,
        "yearId": yearId
      }
    });
  }


  loadDeedInformation(fileId: string) {
    return this._http.post(`${baserUrl}` + API_URls.DEED.LOAD_DEED_INFO, null, {
      params: {
        "fileCode": fileId
      }
    });
  }

  previewDeed(fileId: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.PREVIEW_DEED, {
      params: {
        "filecode": fileId,
      }
      , responseType: 'arraybuffer'
    });
  }

  downloadDeed(fileId: string, district: string) {
    return this._http.get(`${baserUrl}` + API_URls.DEED.DOWNLOAD_DEED, {
      params: {
        "filecode": fileId,
        "district": district
      }
    });
  }
}