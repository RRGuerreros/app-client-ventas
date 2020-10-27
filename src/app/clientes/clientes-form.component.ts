import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteRequest, ClienteResponse } from './cliente-response';
import { ClientesService } from './clientes.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html'
})
export class ClientesFormComponent implements OnInit {

  cliente:ClienteRequest=new ClienteRequest();
  allTipos:any[]=[
    { id:'MOVIL', label:'MOVIL'},
    { id:'FIJO', label:'FIJO'}
  ];

  constructor( private clienteService:ClientesService, 
    private router:Router, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void { 

    $('#checkFacebook').on("change", function(){

        if( $(this).is(":checked") ){

          $("#dvOcultar").show();
          
          $("#paginaWeb").prop("disabled", true );

        } else {

          $("#dvOcultar").hide();

          $("#paginaWeb").prop("disabled", false );
        }

    });

    this.cargarCliente();
  }

  update(): void{

    this.clienteService.updateCliente(this.cliente).subscribe(
      response =>{
        this.router.navigate(['/clientes']);
        swal.fire("Éxito", `Cliente ${response.cliente.razonSocial} actualizado correctamente`, 'success');        
      },
      error =>{
        console.log(error);
      }
    )

  }

  

  cargarCliente(): void{

    this.activatedRoute.params.subscribe(
      params => {

        let id = params["id"];

        if( id ){
          this.clienteService.getCliente(id).subscribe(
            response => {
              this.cliente = response.cliente;

              this.cliente.tipoTelefono = this.allTipos.filter(
                (tipo) => {
                  if( tipo.id.trim() === this.cliente.tipoTelefono.trim() ){
                    return tipo;
                  }
                }
              )[0].id;
              
              console.log(this.cliente);
            },
            
            faild => {
              console.info("error controlado");
              console.log(faild.error);

              if( faild.error.status == 403 ){

                console.info("status");
                console.log(faild.error.status);

                this.router.navigate(['/page403']);

              }

            }

          )
        } 

      }
    )

  }

  enviar(): void{

    console.info(this.cliente);

    this.clienteService.crearCliente(this.cliente).subscribe(
      
      response => {

        console.log(response);
        this.router.navigate(['/clientes']);
        swal.fire("Éxito",`Cliente ${response.cliente.razonSocial} registrado correctamente`,'success');
      },
      error => {
        console.log(error);
      }

    );


  }



}
