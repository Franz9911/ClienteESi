import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  //private url = 'http://localhost:3000/persona/listar'

  constructor(private _http: HttpClient) { }

    // Operación listar
    /*listar(nombre: string, ): Observable<any> {
      let params = new HttpParams();
      params = params.set('nombre', nombre)
      const headers = this.getHeaders();
      return this._http.get<any>(`${environment.apiUrl}/persona/listar`, {
         params, observe: 'response'
      });
    }
  getHeaders() {
    throw new Error('Method not implemented.');
  }*/
  public listar():Observable<Persona[]>{  
    return this._http.get<Persona[]>(`${environment.apiUrl}/persona/listar`);
  }
  public guardar(persona: Persona): Observable<any> {
    console.log("Hola desde el servicio guardar");
    console.log(persona);
    return this._http.post<any>(`http://localhost:3000/persona/agregar`, persona, {
       observe: 'response',headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      
      
    });
  }
}
