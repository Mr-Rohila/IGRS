import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {

  constructor(private _httpClient: HttpClient) {
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: "Complain", url: "/user/admin/query" }])
  }
  complainList: any[] = [];

  ngOnInit(): void {
    this.getComplainList();
  }

  getComplainList() {
    this._httpClient.get('/assets/json/complain.json').subscribe({
      next: (response: any) => {
        this.complainList = response;
      }, error: (error) => {

      }
    });
  }

  openAttachedScreenshot() {

  }

  openRelatedDocument() { }
}
