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

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' });
  }

  public listPersonasSinUsuario():Observable<Persona[]>{  
    return this._http.get<Persona[]>(`${environment.apiUrl}/persona/sinUsuario`);
  }


  public listar():Observable<Persona[]>{  
    const headers = this.getHeaders();
    console.log(headers.keys);
    return this._http.get<Persona[]>(`${environment.apiUrl}/persona/listar`,{
      headers: headers
    });
  }

  public guardar(persona: Persona): Observable<any> {
    console.log("Hola desde el servicio guardar");
    console.log(persona);
    return this._http.post<any>(`http://localhost:3000/persona/agregar`, 
    persona, {
       observe: 'response',headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      
      
    });
  }
}
