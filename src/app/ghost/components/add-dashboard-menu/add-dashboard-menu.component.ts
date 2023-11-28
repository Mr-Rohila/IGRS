import { Component, OnInit } from '@angular/core';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';

@Component({
  selector: 'app-add-dashboard-menu',
  templateUrl: './add-dashboard-menu.component.html',
  styleUrls: ['./add-dashboard-menu.component.css']
})
export class AddDashboardMenuComponent implements OnInit {

  childMenuArray: any[] = [];
  constructor() {
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: "Add Menu", url: "/user/ghost/add-menu" }])
  }

  ngOnInit(): void {
  }

  addChild() {
    var menu = {};
    this.childMenuArray.push(menu);
  }

}
