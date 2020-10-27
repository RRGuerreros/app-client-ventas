export class GeneralResponse<T> {

    message:string;
    clientes:T[];
    cliente:T;
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;

}