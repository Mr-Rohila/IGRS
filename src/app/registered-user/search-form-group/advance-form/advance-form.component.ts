import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchDeedService } from '../../services/search-deed.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advance-form',
  templateUrl: './advance-form.component.html',
  styleUrls: ['./advance-form.component.css']
})
export class AdvanceFormComponent implements OnInit {

  propertyIcon = faCaretRight;
  deedIcon = faCaretRight;
  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;

  userLang: string;
  @Output() ownerList = new EventEmitter<any>();

  constructor(private _searchDeedService: SearchDeedService, private _local: LocalStorageService, private _httpClient: HttpClient) {
    this.userLang = _local.getDefaultLanguage();
  }

  districtList: any[] = [];
  selectedDistrictId: string = "Select";

  villageList: any[] = [];
  selectedVillageId: string = "Select";

  tehsilList: any[] = [];
  selectedTehsilId: string = "Select"

  registrationDistrictList: any[] = [];


  ngOnInit(): void {
    this.loadDistrictList();
  }


  searchDeed() {

  }

  loadDistrictList() {
    this._httpClient.get('/assets/json/district-list.json').subscribe(
      {
        next: (response: any) => {
          if (response?.length > 0) {
            this.districtList = response;
            //load village List
            this.selectedDistrictId = this.districtList[0].id;
            this.loadVillage();
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


  districtChangeEvent(event: any) {

    this.selectedDistrictId = event.target.value;
    //load SR Location
    //load Registration district
    this.loadRegistrationDistrict();
    //load teshil
    //load village
    this.loadVillage();

  }


  loadVillage() {
    if (this.selectedDistrictId == "Select" || this.selectedDistrictId == "")
      return;
    this._httpClient.get('/assets/json/village-list.json').subscribe({
      next: (response: any) => {
        this.villageList = response;
      },
      error: (error) => {
        console.log(error);
        Swal.fire('', 'Village not found !', 'error');
      }
    });
  }

  loadRevenueDistrict() {

  }

  loadRegistrationDistrict() {
    this._searchDeedService.loadRegistrationDistrict(this.selectedDistrictId).subscribe({
      next: (response: any) => {
        this.registrationDistrictList = response;
      }, error: error => {
        console.log(error);
        Swal.fire('', 'Registration District not found !', 'error');
      }
    });
  }

}
