import { Component, OnInit } from '@angular/core';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';

@Component({
  selector: 'app-previous-deed',
  templateUrl: './previous-deed.component.html',
  styleUrls: ['./previous-deed.component.css']
})
export class PreviousDeedComponent implements OnInit {

  constructor() {
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: " Request-List", url: "/user/register/show-request-list" }])
  }

  ngOnInit(): void {
  }

}
