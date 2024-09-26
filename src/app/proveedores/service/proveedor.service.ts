import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(
    private _http: HttpClient,
  ) { }
  public createProveedorServ(pro:Proveedor):Observable<any>{
    return this._http.post<Proveedor>(`${environment.apiUrl}/proveedor/registrar`,pro,{
      observe:'response',headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
}
