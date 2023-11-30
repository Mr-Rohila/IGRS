import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Roles } from 'src/app/shared/model/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faPencil = faPencil;

  roles = Roles;
  nowTime: string | null;
  selectedLang: string | null;
  constructor(private translateService: TranslateService, private localStorage: LocalStorageService) {
    setInterval(() => {
      const pipe = new DatePipe('en-US');
      this.nowTime = pipe.transform(new Date(), 'medium');
    }, 1);
    this.selectedLang = this.localStorage.getDefaultLanguage();
  }

  ngOnInit(): void {
  }

  chnageLang(event: any) {
    this.translateService.use(event.value);
    this.localStorage.setDefaultLanguage(event.value);
    //reload window for change language in UI
    window.location.reload();
  }

  editNotice() {
    Swal.fire({
      title: '',
      html: '<input id="swal-input1" class="swal2-input" placeholder="Enter text">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Enter text (Hindi)" >',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Chnage',
      preConfirm: () => {
        return new Promise(promiss => {
          promiss(
            {
              "text": $('#swal-input1').val(),
              "textHindi": $('#swal-input2').val()
            }
          )
        });
      }
    }).then(result => {
      if (result.isConfirmed) {
        console.log(JSON.stringify(result.value));
        Swal.fire("Change Success", "", "success")
      }
    });
  }

}
