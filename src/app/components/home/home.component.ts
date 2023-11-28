import { Component, OnInit } from '@angular/core';
import { faTrash, faAdd, faPencil } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from 'src/app/app.component';
import { Roles } from 'src/app/shared/model/Roles';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  faTrash = faTrash;
  faAdd = faAdd;
  faPencil = faPencil

  //for access role
  roles = Roles;
  constructor() {
    AppComponent.showNavbarEvent.next(true);
  }

  ngOnInit(): void {
  }

  addLink() {
    Swal.fire({
      title: '',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Enter text">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Enter text (Hindi)" >' +
        '<input id="swal-input3" class="swal2-input" placeholder="Enter Bold text">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Enter Bold text (Hindi)">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Enter URL" >',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Add',
      preConfirm: () => {
        return new Promise(promiss => {
          promiss(
            {
              "text": $('#swal-input1').val(),
              "textHindi": $('#swal-input2').val(),
              "boldText": $('#swal-input3').val(),
              "boldTextHindi": $('#swal-input4').val(),
              "url": $('#swal-input5').val()
            }
          )
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        console.log(JSON.stringify(result.value));
        Swal.fire({
          icon: 'success',
          title: 'Add Success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }


  deleteLink(linkId: string) {
    Swal.fire({
      title: 'Do you want to remove link, with name:' + linkId + '?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Don't Remove`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Removed',
          showConfirmButton: false,
          timer: 1500
        })
      } else if (result.isDenied) {
      }
    })
  }

  chnageFirstPic() {
    Swal.fire({
      title: 'Fill Details',
      html: '<input type="file" id="swal-input1" class="" accept=".png,.jpg,.jpeg">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Enter Name">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Enter Name (Hindi)" >',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Add',
      preConfirm: () => {
        return new Promise(promiss => {
          promiss(
            {
              "file": $('#swal-input1').prop('files')[0],
              "name": $('#swal-input2').val(),
              "nameHimdi": $('#swal-input3').val(),
            }
          )
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        var r: any = result.value;
        console.log(r?.file)
        Swal.fire({
          icon: 'success',
          title: 'Changed',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }


  chnageSecondPic() {
    Swal.fire({
      title: 'Fill Details',
      html: '<input type="file" id="swal-input1" class="" accept=".png,.jpg,.jpeg">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Enter Name">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Enter Name (Hindi)" >',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Add',
      preConfirm: () => {
        return new Promise(promiss => {
          promiss(
            {
              "file": $('#swal-input1').prop('files')[0],
              "name": $('#swal-input2').val(),
              "nameHimdi": $('#swal-input3').val(),
            }
          )
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        var r: any = result.value;
        console.log(r?.file)
        Swal.fire({
          icon: 'success',
          title: 'Changed',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}
