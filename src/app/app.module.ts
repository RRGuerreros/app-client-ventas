import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthService } from './auth/auth.service';
import { ClientesService} from './clientes/clientes.service';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ClientesFormComponent } from './clientes/clientes-form.component';
import { ClientesV2Component } from './clientes-v2/clientes-v2.component';
import { Page403Component } from './page403/page403.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestNewpasswordComponent } from './reset-password/request-newpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    LoginComponent,
    HomeComponent,
    ClientesFormComponent,
    ClientesV2Component,
    Page403Component,
    ResetPasswordComponent,
    RequestNewpasswordComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ClientesService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
