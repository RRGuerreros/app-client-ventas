import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { GeneralResponse } from '../clientes/general-response';
import { ClienteResponse } from '../clientes/cliente-response';
import { DataTableDirective } from 'angular-datatables';
import { ClientesService } from '../clientes/clientes.service';

import swal from 'sweetalert2';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-clientes-v2',
  templateUrl: './clientes-v2.component.html',
  styleUrls: ['./clientes-v2.component.css']
})
export class ClientesV2Component implements AfterViewInit, OnInit {

  private dtColumnsIndex:Array<number> = [];
  
  private endPoint:string = "http://localhost:8080/webservice/api/rest/v1/clientes/server-side";
  
  clientes:ClienteResponse[];
  authorities:Array<String>=[];
  demo:boolean;
  
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  constructor( private http: HttpClient,
    private clienteService:ClientesService, private tokenStorage: TokenStorageService ) { }
  
  ngOnInit(): void {  

    this.authorities = this.tokenStorage.getAuthorities();

    this.demo = this.authorities.includes("ROLE_ADMIN");

    console.log("demo -> " + this.demo );

    console.log("iniciando el componente cliente v2");

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',      
      serverSide: true,
      processing: true,
      searching: false,
      responsive:true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http.post<GeneralResponse<ClienteResponse>>( this.endPoint, dataTablesParameters, {} ).subscribe(
          response => {

            console.log("respuesta del servidor");
            console.log(response);

            that.clientes = response.clientes;

            callback({
              recordsTotal: response.recordsTotal,
              recordsFiltered: response.recordsFiltered,
              data: []
            });
          });
      },/*
      columns: [
        { }, 
        { data: 'razonSocial' }, 
        { data: 'ruc' }, 
        { data: 'telefono' },
        { data: 'tipoTelefono' }, 
        { data: 'paginaWeb' },
        { data: 'direccion' }
      ],*/
      initComplete: function () {
        /*
        console.log("ejecutando initComplete");
        this.api().columns([4]).every( function () {
            var column = this;
            var select = $('<select><option value=""></option></select>')
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {

                });

            column.data().unique().sort().each( function ( d, j ) {
                select.append( '<option value="'+d+'">'+d+'</option>' )
            } );
        } );
        */
      }
    }


  }

  ngAfterViewInit(): void {

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {

      let length_th = $("#tbCliente thead tr th").length;
      let dtFilterSelectIndex = 0;

      if( length_th == 6 ){
        this.dtColumnsIndex = [0,1,2,3,4,5];
        dtFilterSelectIndex = 3;
      } else {
        this.dtColumnsIndex = [1,2,3,4,5,6];
        dtFilterSelectIndex = 4;
      }

      dtInstance.columns(this.dtColumnsIndex).every(function () {
        const that = this;
        
        if( this[0][0] ==  dtFilterSelectIndex){

          $('select', this.footer()).on('change', function () {
  
            if (that.search() !== this['value']) {
                          
              that.search(this['value']).draw();
              
            }
          });

        } else {

          $('input', this.footer()).on('keyup', function (e) {
              
            if( e.key === "Enter"){
              if (that.search() !== this['value']) {
                          
                that.search(this['value']).draw();
                
              }
            }
            
          });
        }        
      });
    });
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

  reload(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });    
  }
  

}
