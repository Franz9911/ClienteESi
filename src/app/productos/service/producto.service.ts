import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';
import { Observable } from 'rxjs';
//defini la ruta principal del apires
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  

  constructor(private _http: HttpClient) { }
  public registrarProductos(pr:Producto):Observable<any>{
    console.log("hola desde el serv_producto")
    alert("hola pancho")
    console.log(pr);
    return this._http.post(`${environment.apiUrl}/producto/registrar`,pr,{
      observe: 'response',headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
  //guardar la imagen en el servidor
  public registraAchivoImg(imgfile:FormData):Observable<any>{
    return this._http.post<FormData>(`${environment.apiUrl}/producto/imagen`,imgfile,{
      observe: 'response',headers:new HttpHeaders({
        
      })
    });
  }
  
  public listarTodosProductos():Observable<Producto[]>{
    return this._http.get<Producto[]>(`${environment.apiUrl}/producto/listar`);
  }
}
