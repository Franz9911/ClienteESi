import { Producto } from "src/app/productos/model/producto";
//sin uso 
export class LoteVista {
    public id!: number;
    public unidades!:number;
    public costoLote!:number; 
    public unidadesDispo!:number
    public precioVentaLoteSugerido!:number;
    public producto!: Producto;
    //public idCompra!:number;

}