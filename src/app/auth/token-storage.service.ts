import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService{

    private roles: Array<string> = [];

    public saveToken( token:string ): void{
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY,token);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveUsername(username:string): void{
        window.localStorage.removeItem(USERNAME_KEY);
        window.localStorage.setItem(USERNAME_KEY,username);
    }

    public getUsername(): string{
        return localStorage.getItem(USERNAME_KEY);
    }

    public saveAuthorities( authorities:any[]): void{
        window.localStorage.removeItem(AUTHORITIES_KEY);
        window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    }

    public getAuthorities(): string[]{
        this.roles = [];

        if( localStorage.getItem(TOKEN_KEY) ){

            //console.log("token recibido desde el localStorage");
            //console.log(localStorage.getItem(TOKEN_KEY));

            //console.log("authorities recibido desde el localStorage");
            //console.log(localStorage.getItem(AUTHORITIES_KEY));

            JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
                this.roles.push( authority.authority);
            });
        }

        return this.roles;
    }

    signOut(): void {
        window.localStorage.clear();
        window.location.reload();
    }

    constructor() { } 
}