import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import swal from 'sweetalert2';

export function onlyPermitAlfanumericosValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return !forbidden ? {forbiddenName: {value: true}} : null;
  };
}

@Component({
  selector: 'app-request-newpassword',
  templateUrl: './request-newpassword.component.html',
  styleUrls: ['./request-newpassword.component.css']
})
export class RequestNewpasswordComponent implements OnInit {

  response:any = { message: ""};

  form:FormGroup = new FormGroup({});
  regExpPassword = new RegExp("^[A-Za-z0-9]+$");

  public newPasswordRequest:any = { token: "", password: "", confirPassword: "" };

  private urlTree:UrlTree;
  private token:string;

  constructor( private router: Router, private authService:AuthService, private formBuilder:FormBuilder ) {

    const controlPassword = new FormControl(
      "", [Validators.required, Validators.minLength(3), onlyPermitAlfanumericosValidator(this.regExpPassword) ]);

    this.form = formBuilder.group({
      password : controlPassword,
      //password : ['', [Validators.required], [] ],
      confirmPassword : ['', [Validators.required, onlyPermitAlfanumericosValidator(this.regExpPassword) ] ]
    },{
      validators: this.confirmeValidator('password', 'confirmPassword')
    });


  }

  ngOnInit(): void {

  }

  send(): void{
    
    // Obtener los parametros de la URL
    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.queryParams['token'];

    // Establecer los valores al objeto
    this.newPasswordRequest.token = this.token;
    this.newPasswordRequest.password = this.form.controls.password.value;

    console.info("enviando la new password request");
    console.log(this.newPasswordRequest);

    this.authService.newPasswordReset(this.newPasswordRequest).subscribe(
      
      response => {

        this.response = response;

        this.router.navigate(['/login']);

        swal.fire("Éxito", "La contraseña fue cambiada correctamente!!", "success");

      },

      error => {

        this.response = error;

        console.info( error );

        swal.fire("Error", this.response.message, "error");
      }

    );





  }

  confirmeValidator( controlName:string, matchingControlName:string ){

    return function(formGroup:FormGroup) {

      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if( matchingControl.errors && !matchingControl.errors.confirmedValidator){
        return;
      }

      if( control.value !== matchingControl.value ){
        matchingControl.setErrors({ confirmedValidator:true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  confirmeValidatorv2( controlName:string, matchingControlName:string ){

    return function(formGroup:FormGroup) {

    }
  }

}
