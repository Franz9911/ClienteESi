import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Producto } from 'src/app/productos/model/producto';
import { Lote2 } from '../model/lote2';
import { LoteDto } from 'src/app/lotes/model/lote-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private titleSource = new BehaviorSubject<string>("Carrito");
  currentTitle = this.titleSource.asObservable();
  //title:string=""
  productosCarritoESI:LoteDto[]=[];
  productosCarrito:Lote2[]=[];

  constructor(private _http:HttpClient,) { }
  public carritoESi(loteProd:LoteDto){
    console.log("hola desde el sevicio del carrito ESI")
    this.productosCarritoESI.push(loteProd);
    console.log(this.productosCarritoESI);
  }
  public quitarProducto(i:number){
    this.productosCarritoESI.splice(i,1);
    console.log(this.productosCarritoESI);
  }
  public getProductosCarrito(){
    return this.productosCarritoESI;
  }
  public getIsFullCarritoESI(){
    if(this.productosCarritoESI.length>0) return true;
    else return false;
  }
  public changeTitle(t:string){
    console.log("hola desde el servicio del carrito "+ t);
    this.titleSource.next(t)
  }
  public retoque(loteProd:LoteDto){
    console.log("hola desde el sevicio del carrito retoque");
    console.log(loteProd);
  }
  //guardar en la db los productos del carritoESI
  //imcompleto 
  public keepOneDBLote(productoC:any){
    console.log("hola desde keep one db lote");
    console.log(productoC)
    return this._http.post(`${environment.apiUrl}/lote/registrar`,productoC,{
      observe: 'response',headers:new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
  }

  public keepOneDBLote1(){
    const idCompra=3;
    console.log("hola desde keep one db lote1");
    
    const lotes = this.productosCarritoESI.map(lote => {
      const { idCompra,producto , unidades, unidadesDispo, costoLote, precioVentaLoteSugerido } = lote; // Desestructurar
      return {
        idCompra:3,
       unidades,
       unidadesDispo,
       precioVentaLoteSugerido,
       producto,
       costoLote,
      };
    });

    console.log(lotes)
     return this._http.post(`${environment.apiUrl}/lote/registrar`,lotes[0],{
       observe: 'response',headers:new HttpHeaders({
         'Content-Type': 'application/json',
       })
     })
  }
//guardar todos los productos del carrito
  public keepAllDBLotes(idCom:number) {
    const lotes = this.productosCarritoESI.map(lote => {
      const { idCompra,producto , unidades, unidadesDispo, costoLote, precioVentaLoteSugerido } = lote; // Desestructurar
      return {
        idCompra:idCom,
       unidades,
       unidadesDispo,
       precioVentaLoteSugerido,
       producto,
       costoLote,
      };
    });
    //console.log(lotes);
    const requests = lotes.map(p => this.keepOneDBLote(p));
    console.log("requests");
    console.log(requests);
    return forkJoin(requests);
  }

}
