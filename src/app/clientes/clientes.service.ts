import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteRequest, ClienteResponse } from './cliente-response';
import { GeneralResponse } from './general-response';

const httpOption = {
    headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*',        
        'Access-Control-Allow-Headers': 'Authorization, accept, Content-Type'        
    })
}

@Injectable({
    providedIn:'root'
})
export class ClientesService{

    private clientesURL = 'http://localhost:8080/webservice/api/rest/v1/clientes';

    private swapiPeople = 'https://swapi.dev/api/people';

    constructor( private http: HttpClient ){}

    getClientes(): Observable<GeneralResponse<ClienteResponse>>{
        return this.http.get<GeneralResponse<ClienteResponse>>(this.clientesURL);
    }

    crearCliente( cliente:ClienteRequest ): Observable<GeneralResponse<ClienteResponse>>{
        return this.http.post<GeneralResponse<ClienteResponse>>(this.clientesURL, cliente, httpOption );
    }

    getCliente(id:number): Observable<GeneralResponse<ClienteResponse>>{
        return this.http.get<GeneralResponse<ClienteResponse>>(`${this.clientesURL}/${id}`);
    }

    updateCliente( cliente:ClienteRequest): Observable<GeneralResponse<ClienteRequest>>{
        console.log(`${this.clientesURL}/${cliente.id}`);
        console.log("cliente request -> " + JSON.stringify(cliente));
        return this.http.put<GeneralResponse<ClienteRequest>>(`${this.clientesURL}/${cliente.id}`.trim(), JSON.stringify(cliente), httpOption );
    }

    delete( id:number ): Observable<GeneralResponse<ClienteResponse>>{
        return this.http.delete<GeneralResponse<ClienteResponse>>(`${this.clientesURL}/${id}`, httpOption );
    }

    getPeople( id:number ): Observable<any>{
        return this.http.get<Observable<any>>(`${this.swapiPeople}/${id}/`);
    }

}