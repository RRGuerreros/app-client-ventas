import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor( private authService:AuthService ) { }

  passwordResetRequest:any = {
    "email" : ""
  }

  ngOnInit(): void {

  }

  send():void{

    console.clear();
    console.log(this.passwordResetRequest);

    this.authService.resetPassword( this.passwordResetRequest ).subscribe(
      response => {

        console.log(response);
        
        swal.fire("Éxito", "La solicitud de cambio de contraseña fue enviada a su correo.", "success");

      },
      error => {
        console.log(error);

        swal.fire("Error", "Hubo errores al enviar el correo", "error");
      }
    )

  }
}
