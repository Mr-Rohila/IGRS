import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import baserUrl from 'src/app/helper/baserUrl';
import API_URls from 'src/app/app-constance/API_URLs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private _router: Router) { }

  registerForm: FormGroup;
  submitted = false;
  isOTPValidate = false;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      // name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?!.*\s).{8,}$/)
      ]],
      acceptTerms: [false, Validators.requiredTrue]
    },
      {
        validator: this.confirmedValidator('password', 'confirmPassword'),
      });
  }


  // convenience getter for easy access to form fields
  get form() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    //send data to the backend
    var registrationModel = this.registerForm.value;
    registrationModel.isMobileVerified = this.isOTPValidate;
    console.log(registrationModel)

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

    this.authService.registred(this.registerForm.value, '1').subscribe({
      next: (response: any) => {
        if (response.message == 'Success') {
          alert('Registration Success ! Please login');
          this._router.navigate(['/auth/login']);
        }
        else {
          alert('Registration failed! try after some time');
        }
      },
      error: error => {
        alert('Registration failed! try after some time');
      }
    });

  }

  onReset() {
    this.submitted = false;
    this.isOTPValidate = false;
    this.registerForm.reset();
  }

  onSendOTP() {
    this.isOTPValidate = false;
    var mobileNo = this.form.mobileNo;
    if (mobileNo == undefined || mobileNo.status != 'VALID') {
      this._snackBar.open('Invalid Mobile No.');
      return;
    }

    let timerInterval: any;
    Swal.fire({
      title: 'OTP sent successfully to your mobile no. +91 ' + mobileNo.value,
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
      cancelButtonText: 'Edit',
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

        //call send OTP API
        this.authService.sendOTP(mobileNo.value).subscribe({
          next: (response: any) => {
            if (response.message != 'sent')
              Swal.close();
            this._snackBar.open(response.message);
          },
          error: (error) => {
            Swal.close();
            this._snackBar.open('Something wrong ! Try after some time');
          }
        });
      },
      willClose: () => {
        clearInterval(timerInterval)
      },
      preConfirm: (login) => {
        //call OTP verification API
        return fetch(`${baserUrl}` + API_URls.VERIFICATION.OTP_VERIFIED + "?mobileNumber=91" + mobileNo.value + "&otp=" + login, {
          method: 'POST'
        })
          .then(async response => {
            console.log(response);
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            var data = await response.json();
            if (data.message == "OTP match successfully") {
              this.isOTPValidate = true;
              return data;
            }
            else {
              throw new Error("Invalid OTP")
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
      }
    })
  }

  onValidateOTP() {
    this.isOTPValidate = true;
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.mustMatch
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
