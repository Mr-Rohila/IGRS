import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {

  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  createNewPasswordForm: FormGroup;

  mobileNo: string | null;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar, private _activeRouter: ActivatedRoute, private _router: Router) {
    this.mobileNo = this._activeRouter.snapshot.queryParamMap.get('mobileNo');

  }

  ngOnInit(): void {
    this.createNewPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
      ]],
      confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
      ]],
    },
      {
        validator: this.confirmedValidator('password', 'confirmPassword'),
      });
  }
  // convenience getter for easy access to form fields
  get form() { return this.createNewPasswordForm.controls; }
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
  onSubmit() {
    // validate the form and send to the server
    // call the server api
    if (this.createNewPasswordForm.invalid) {
      return;
    }

    var result = this.createNewPasswordForm.value;

    console.table(result)
    alert(JSON.stringify(result, null, 4));
    //form validated
    //call the server api

    if (this.mobileNo)
      this.authService.restPasswordSave(this.mobileNo, result.password).subscribe(
        {

          next: (response: any) => {
            if (response.message == "Your password reset successfully") {
              this._router.navigate(['/user/dashboard']);
            }
            else {
              this._snackBar.open('Something wrong ! Try again.');
            }
          },
          error: (error) => {
            console.log(error);
            this._snackBar.open('Something wrong ! Try again.');
          }
        }
      );
    else {
      this._snackBar.open('Something wrong ! Try again.');
    }
  }

}
