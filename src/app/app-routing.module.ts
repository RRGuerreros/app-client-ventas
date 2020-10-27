import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { AuthRouter } from './auth/auth-router';
import { HomeComponent } from './home/home.component';
import { ClientesFormComponent } from './clientes/clientes-form.component';
import { ClientesV2Component } from './clientes-v2/clientes-v2.component';
import { Page403Component } from './page403/page403.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RequestNewpasswordComponent } from './reset-password/request-newpassword.component';

const routes: Routes = [
    { path: 'clientes', component: ClientesV2Component, canActivate: [AuthRouter], data: { expectedRol: ['ROLE_USER','ROLE_ADMIN'] } },
    { path: 'clientes/form', component: ClientesFormComponent },
    { path: 'clientes/form/:id', component: ClientesFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'page403', component: Page403Component },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'newpassword-reset', component: RequestNewpasswordComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
] 

@NgModule({
    imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}