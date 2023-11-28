import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SearchDeedService } from '../../services/search-deed.service';
import { Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-by-owner-name',
  templateUrl: './by-owner-name.component.html',
  styleUrls: ['./by-owner-name.component.css']
})
export class ByOwnerNameComponent implements OnInit {

  @Output() ownerList = new EventEmitter<any>();

  userLang: string;
  constructor(private _searchDeedService: SearchDeedService, private _local: LocalStorageService, private _httpClient: HttpClient) {
    this.userLang = _local.getDefaultLanguage();

  }

  districtList: any[] = [];
  selectedDistrictId: string = "Select";

  tehsilList: any[] = [];
  selectedTehsilId: string = "Select"


  villageList: any[] = [];
  selectedVillageId: string = "Select";

  registrationYearList: any[] = [];
  selectedYearId: string = "Select"
  ngOnInit(): void {
    // load district list
    this.loadDistrictList();
    //load year
    this.loadYear();
  }

  searchDeed() {
    // if (this.validateForm()) {
    //   Swal.fire('Validation', 'Please select all required fields', 'info');
    //   return;
    // }
    // search data
    this._searchDeedService.loadOwnerName("2", "1", "15697", "3").subscribe(
      {
        next: (response: any) => {
          if (response?.length > 0) {
            this.ownerList.emit(response);
          }
          else {
            Swal.fire('', 'Data not found ', 'info');
          }
        },
        error: error => {
          console.log(error)
          Swal.fire('', 'Data not found ', 'info');
        }
      }
    );
    return false;
  }

  validateForm() {
    return (this.selectedDistrictId == "Select" || this.selectedDistrictId == "" || this.selectedDistrictId === undefined) ||
      (this.selectedTehsilId == "Select" || this.selectedTehsilId == "" || this.selectedTehsilId === undefined) || (this.selectedVillageId == "Select" || this.selectedVillageId == "" || this.selectedVillageId === undefined) ||
      (this.selectedYearId == "Select" || this.selectedYearId == "" || this.selectedYearId === undefined);
  }

  loadDistrictList() {
    this._searchDeedService.loadDistrictList().subscribe(
      {
        next: (response: any) => {
          if (response?.length > 0) {
            this.districtList = response;
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

  onDistrictChange = () => {
    //load tehsil
    this.loadTehsil(this.selectedDistrictId);
    // load village
    this.loadVillage(this.selectedDistrictId);
  }

  loadTehsil(districtId: string) {
    this.tehsilList = [];
    this._searchDeedService.loadTehsil(districtId).subscribe(
      {
        next: (response: any) => {
          this.tehsilList = response;
        },
        error: (error) => {
          console.log(error);
          Swal.fire('', 'Tehsil not found !', 'error');
        }
      }
    );
  }


  loadVillage(districtId: string) {
    this.villageList = [];
    if (districtId == "Select" || districtId == "")
      return;
    this._searchDeedService.loadVillage(districtId).subscribe({
      next: (response: any) => {
        this.villageList = response;
      },
      error: (error) => {
        console.log(error);
        Swal.fire('', 'Village not found !', 'error');
      }
    });
  }

  loadYear() {
    this._searchDeedService.loadYear().subscribe({
      next: (response: any) => {
        this.registrationYearList = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
