import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompraDto } from '../model/compra-dto';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CompraServiceService {

  constructor(private _http:HttpClient) { }
  public keepDBCompra(com:CompraDto){
    alert("hola compra");
    console.log(com);
    return this._http.post(`${environment.apiUrl}/compra/registrar`,com,{
      observe: 'response',headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
