import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchDeedService } from '../../services/search-deed.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-by-registration-year',
  templateUrl: './by-registration-year.component.html',
  styleUrls: ['./by-registration-year.component.css']
})
export class ByRegistrationYearComponent implements OnInit {

  userLang: string;
  @Output() ownerList = new EventEmitter<any>();

  constructor(private _searchDeedService: SearchDeedService, private _local: LocalStorageService, private _httpClient: HttpClient) {
    this.userLang = _local.getDefaultLanguage();
  }

  districtList: any[] = [];
  selectedDistrictId: string = "Select";
  registrationYearList: any[] = [];
  selectedYearId: string = "Select"

  ngOnInit(): void {

    this.loadDistrictList();
    this.loadYear();

  }

  searchDeed() { }

  loadDistrictList() {
    this._httpClient.get('/assets/json/district-list.json').subscribe(
      {
        next: (response: any) => {
          if (response?.length > 0) {
            this.districtList = response;
            //load village List
            this.selectedDistrictId = this.districtList[0].id;

          }
          else {
            Swal.fire('', 'Something Wrong ! try After some time', 'error');
          }
        },
        error: (error) => {
          Swal.fire('', 'Something Wrong ! try After some time', 'error');
          console.log(error);
        }
      }
    );
  }

  loadYear() {
    this._httpClient.get('/assets/json/year-list.json').subscribe({
      next: (response: any) => {
        this.registrationYearList = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
