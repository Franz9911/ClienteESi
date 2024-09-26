import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuarios';
import { Observable } from 'rxjs';
import { Rol_idDto } from 'src/app/roles/model/rol-id-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  public keepDBUsuario(u:Usuario){
    console.log(u);
    return this.http.post(`${environment.apiUrl}/usuario/registrar`,u,{
      observe: 'response',headers:new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
  //buscamos en la db los roles asignados al usuario 
  public listRoles(usuarioId:number):Observable<Rol_idDto[]>{
    console.log("paso 2 usuarioserv");
    return this.http.get<any>(`${environment.apiUrl}/usuario-rol/usuarioId/${usuarioId}`);
  }
  
  /* 
      //buscamos en la db los roles asignados al usuario 
  getRolesServ(idUsuario:number):Observable<Rol_idDto[]>{
    //como parametro enviamos el id del usuario
    return this._http.get<Rol_idDto[]>(`${environment.apiUrl}/usuario-rol/usuarioId/${idUsuario}`);
  }
  */
}
