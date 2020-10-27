import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from './login-request';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/webservice/api/login';
  private resetPasswordUrl = 'http://localhost:8080/webservice/reset-password';
  private resetNewPasswordUrl = 'http://localhost:8080/webservice/password-reset';

  constructor( private http: HttpClient ) { }

  attemptAuth( credenciales: LoginRequest ): Observable<any>{
    return this.http.post<any>(this.loginUrl, credenciales, httpOption);
  }

  resetPassword( passwordResetRequest:any ): Observable<any>{
    return this.http.post<any>(this.resetPasswordUrl, passwordResetRequest, httpOption );
  }

  newPasswordReset( newpasswordReset:any ): Observable<any>{
    return this.http.post<any>(this.resetNewPasswordUrl, newpasswordReset, httpOption );
  }


}
