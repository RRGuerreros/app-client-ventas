import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';


@Injectable({
    providedIn: 'root'
})
export class AuthRouter implements CanActivate{
    
    expectedRol:string[]=[];
    hasRol:boolean=false

    constructor( 
        private tokenService: TokenStorageService,
        private router:Router ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.hasRol=false;
        this.expectedRol = route.data.expectedRol;

        if( !this.tokenService.getToken() ){
            this.router.navigate(['/login']);
            return false;
        }

        const roles = this.tokenService.getAuthorities();
        
        for( var i=0; i < this.expectedRol.length; i++ ){

            //console.log("Espera el rol de -> " + this.expectedRol[i] );

            for( var j=0; j < roles.length; j++ ){

                //console.log("rol del user -> " + roles[j] );

                if( roles[j] === this.expectedRol[i] ){

                    this.hasRol = true;
                    //console.info("El user esta autorizado");
                    //console.info("saliendo del for roles del user");
                    break;
                }
            }

            if( this.hasRol ){
                //console.info("saliendo del for de roles esperados");
                break;
            }

        }        

        // SI NO TIENE EL PERMISO
        if( !this.hasRol ){
            this.router.navigate(['/page403']);
            return false;
        }
        return true;
    }

}