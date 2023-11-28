import { Component, OnInit } from '@angular/core';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';
import { SearchRecordService } from '../../services/search-record.service';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-record',
  templateUrl: './search-record.component.html',
  styleUrls: ['./search-record.component.css']
})
export class SearchRecordComponent implements OnInit {
  faAngleDown = faAngleDown;
  faAngleRight = faAngleRight;

  constructor(private _searchRecordService: SearchRecordService, private _httpClient: HttpClient) {
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: "Search", url: "/user/admin/search-record" }])
  }
  recordList: any[] = [];
  displayedColumns =
    ['VolumeNo', 'BookNo', 'DocumentNo', 'DateOfRegistration', 'DocumentType', 'PartyName1', 'PartyName1Hindi', 'RelativeName1', 'RelativeName1Hindi', 'Action'];

  ngOnInit(): void {
  }
  onSubmit() {
    this._httpClient.get('/assets/json/deed-record.json').subscribe({
      next: (response: any) => {
        this.recordList = response;
      },
      error: (error) => {
        Swal.fire('Failed', 'Data Not found', 'info');
      }
    });
  }
}
