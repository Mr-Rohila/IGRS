import { Component, OnInit } from '@angular/core';
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';
import Swal from 'sweetalert2';

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
  verifyPayment() {
    Swal.fire({
      title:'Payment',
      text:'We are working on it, please wait 2 working days, if time is expired please file a complaint',
      icon: 'info',
      showConfirmButton: false,
      timer: 3000
    });
  }

  downloadDeed() {
    alert('Downloaded');
  }

  rePayment() {
    alert('Repayment');
  }
}
