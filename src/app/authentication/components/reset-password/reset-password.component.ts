import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NavigationExtras, Router } from '@angular/router';
import baserUrl from 'src/app/helper/baserUrl';
import API_URls from 'src/app/app-constance/API_URLs';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private translateService: TranslateService, private _router: Router) { }

  searchValue: string;
  isValidValue: boolean;
  message: string | null;
  messageIsSuccess: boolean;
  ngOnInit(): void {
  }


  showMessage(message: string | null, isSuccess: boolean) {
    this.message = message;
    this.messageIsSuccess = isSuccess;
  }

  onSubmit() {
    this.showMessage(null, false);
    this.isValidValue = false;
    const validateMobileNo = (input: string) => {
      var validRegex = /^\(?(\d{10})\)?$/;
      return input.match(validRegex);
    }


    if (validateMobileNo(this.searchValue)) {
      //user reset password via mobile No. => send OTP
      this.authService.restPassSendOTP(this.searchValue).subscribe(
        {
          next: (response: any) => {
            if (response?.message === 'sent') {
              //OTP send success
              // validate the OTP
              this.validateOTP();
              //navigate the -> create password components
            }
            else {
              //some error in the bckend 
              this.showMessage(response?.message, false);
            }
          },
          error: (error) => {
            //some error in the bckend 
            console.log(error);
            this.showMessage(error?.error.message, false);
          }
        }
      );
    }
    else {
      //invalid mobile number format
      this.showMessage("Invalid mobile No", false);
      this.isValidValue = false;
    }
  }

  validateOTP() {
    let timerInterval: any;
    Swal.fire({
      title: 'OTP sent successfully',
      input: 'text',
      html: 'OTP expired in <strong></strong> seconds.<br/><br/>',
      inputPlaceholder: 'Enter OTP',
      inputAttributes: {
        autocapitalize: 'off'
      },
      timer: 300000, //5 min
      //timer:10000,
      showCancelButton: true,
      confirmButtonText: 'Validate',
      cancelButtonText: 'Close',
      showLoaderOnConfirm: true,
      timerProgressBar: true,
      didOpen: () => {
        const b = Swal.getHtmlContainer()?.querySelector('strong')
        timerInterval = setInterval(() => {
          if (b != null) {
            const t = Swal.getTimerLeft() as number;
            b.textContent = (t / 1000).toFixed(0);
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      },
      preConfirm: (otp) => {
        return fetch(`${baserUrl}` + API_URls.VERIFICATION.OTP_VERIFIED + "?mobileNumber=91" + this.searchValue + "&otp=" + otp, {
          method: 'POST'
        })
          .then(async response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            else {
              var data = await response.json();
              if (data.message == "OTP match successfully") {
                this._router.navigate(['auth/create-password'], {
                  queryParams: {
                    mobileNo: this.searchValue
                  }
                });
                return data;
              }
              else {
                throw new Error("Invalid OTP")
              }
            }
          }).catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        /// do nothing
      }
    })
  }
}