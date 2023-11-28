import { Component, OnInit } from '@angular/core';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  constructor() {
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: "Query", url: "/user/register/query" }])


  }

  ngOnInit(): void {
  }

}
