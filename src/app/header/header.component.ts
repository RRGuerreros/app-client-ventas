import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {
  
  private hasRol:boolean = false;
  private ITEMS_MENU:any[]=[
    { path: '/clientes', label: 'Clientes', roles: ['ROLE_USER','ROLE_ADMIN']}
    //{ path: '/facturas', label: 'Facturas', roles: ['ROLE_ADMIN','ROLE_USER']},
    //{ path: '/boletas', label: 'Boletas', roles: ['ROLE_ADMIN']},
    //{ path: '/trabajadores', label: 'Trabajadores', roles: ['ROLE_ADMIN']},
  ];

  public titulo: string = 'JSON WEB TOKEN';
  public roles: string[];
  isLogin:boolean=false;

  constructor(private tokenStorage: TokenStorageService) { }

  public authItems:any[]=[
    { path: '/home', label: 'Home', roles: []}
  ];

  ngOnInit(): void {

    //console.info("Iniciando el proceso de construir el menu header");

    this.buildSideBar();

  }

  buildSideBar(): void{
    if (this.tokenStorage.getToken()) {
      this.isLogin = true;
      this.roles = this.tokenStorage.getAuthorities(); 

      if( this.roles.length > 0 ){

        //console.log("Recorriendo los items menu");

        this.ITEMS_MENU.forEach( item => {

          //console.log("ITEM -> " + item.label );
          //console.info("Total de roles item size -> " + item.roles.length );

          this.hasRol = false;
          
          for( var i=0; i < item.roles.length; i++ ){

            var _roles = item.roles;

            //console.log("Required rol: " + _roles[i] );

            for( var j=0; j < this.roles.length; j++ ){

              var _rol_user = this.roles[j];

              //console.log("Rol del user: " + _rol_user );
            
              if( _rol_user === _roles[i] ){

                //console.log("Agregando item al user ");
                //console.log("nuevo item agregado -> " + item.label );
                
                this.authItems.push(item);
                this.hasRol = true;
                //console.info("tiene el rol -> " + this.hasRol + ", saliendo del for roles user");
                break;              
              }
            }

            if( this.hasRol ){
              //console.info("saliendo del for de item roles");
              return false;
            }
          }
        });

      }      

    }
  }

  logout(): void {
    this.tokenStorage.signOut();
  }

  

}
