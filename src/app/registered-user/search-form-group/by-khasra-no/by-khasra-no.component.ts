import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchDeedService } from '../../services/search-deed.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-by-khasra-no',
  templateUrl: './by-khasra-no.component.html',
  styleUrls: ['./by-khasra-no.component.css']
})
export class ByKhasraNoComponent implements OnInit {

  userLang: string;
  @Output() ownerList = new EventEmitter<any>();
  constructor(private _searchDeedService: SearchDeedService, private _local: LocalStorageService, private _httpClient: HttpClient) {
    this.userLang = _local.getDefaultLanguage();
  }

  districtList: any[] = [];
  selectedDistrictId: string = "Select";
  khasraNo = "";

  ngOnInit(): void {
    this.loadDistrictList();
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

}
