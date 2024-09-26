import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lote } from '../model/lote';

@Injectable({
  providedIn: 'root'
})
export class LoteServiceService {

  constructor(
    private _http: HttpClient
  ) { }
  public listLotes():Observable<Lote[]>{
    return this._http.get<Lote[]>(`${environment.apiUrl}/lote/listar`);
  }
}
