import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LoginRequest } from '../auth/login-request';
import { TokenStorageService } from '../auth/token-storage.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: LoginRequest;

  isLoginFailed:boolean=false;
  errorMessage:string;
  roles: string[] = [];

  constructor( 
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new LoginRequest();

    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void{
    console.log( this.form );

    this.authService.attemptAuth(this.form).subscribe(
      data => {
        console.log("Respuesta del login");
        console.log(data);
        
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.user.username);
        this.tokenStorage.saveAuthorities(data.user.authorities);
        this.isLoginFailed = false;
        this.roles = this.tokenStorage.getAuthorities();   
        window.location.reload();
      },
      error => {
        this.isLoginFailed = true;
        this.errorMessage = error.error.mensaje;

        console.log(error);
      }
    );
  }

}
