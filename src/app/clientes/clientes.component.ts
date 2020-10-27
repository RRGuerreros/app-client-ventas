import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ClienteResponse } from './cliente-response';
import { ClientesService } from './clientes.service';

import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ClienteResponse> = new Subject();
  clientes:ClienteResponse[]=new Array();   
  constructor( private clienteService: ClientesService ) { }

  ngOnInit(): void {
   
    this.dtOptions = {
      scrollX:true,
      responsive:true,
      pagingType: 'full_numbers',
      language : {		        	
          "decimal": "",
          "emptyTable": "No hay clientes registrados",
          "info": "Mostrando _START_ hasta _END_ de _TOTAL_ resultados",
          "infoEmpty": "0 clientes",
          "infoFiltered": "",
          //"infoFiltered": "(filtered from _MAX_ total entries)",
          "infoPostFix": "",
          "thousands": ",",
          "lengthMenu": "Mostrando _MENU_ resultados",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Ingrese un  criterio de búsqueda:",
          "zeroRecords": "No se encontraron registros coincidentes",
          "paginate": {
              "first": "Primero",
              "last": "Ultimo",
              "next": "Siguiente",
              "previous": "Anterior"
          }
      }
    };
    
    this.cargarClientes();
  }

  delete( cliente:ClienteResponse ): void{

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.razonSocial}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {

            //this.clientes = this.clientes.filter( cli => cli !== cliente );

            this.reload();

            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',`Cliente ${cliente.razonSocial} eliminado con éxito.`,'success');

            
          },
          error => {
            console.log(error);
          }
        )
      } 

    })
  }

  cargarClientes(): void{

    this.clienteService.getClientes().subscribe(
      response =>{
        this.clientes = response.clientes;   
        this.dtTrigger.next();
      },
      error => {
        console.log(error);
      }
    );
  }

  reload(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();     
      this.cargarClientes();      
    });    
  }


}
