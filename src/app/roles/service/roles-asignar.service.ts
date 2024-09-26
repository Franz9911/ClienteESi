import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Usuario } from 'src/app/usuarios/model/usuarios';
import { CreateUsuarioRolDto } from '../model/usuario-rol-dto';
import { environment } from 'src/environments/environment';
import { Rol_idDto } from '../model/rol-id-dto';

@Injectable({
  providedIn: 'root'
})
export class RolesAsignarService {
  usuarioAux:Usuario=new Usuario(); //recibe los datos de usuario que recibe o pierde roles
  
  constructor(
    private _http: HttpClient,
  ) { }

  //recibirUser(usuario:Usuario){
  receiveUsuario(usuario:Usuario){  
    console.log(usuario);
    this.usuarioAux=usuario;
  }
  getUsarioServ(){
    return this.usuarioAux;
  }
  addRolesServ(usuarioRol:CreateUsuarioRolDto):Observable<any>{
    console.log("hola tarola");
    //console.log(usuarioRol)
      return this._http.post(`${environment.apiUrl}/usuario-rol/registrar`,usuarioRol,{
      observe:'response',headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }
  //buscamos en la db los roles asignados al usuario 
  getRolesServ(idUsuario:number):Observable<Rol_idDto[]>{
    //como parametro enviamos el id del usuario
    return this._http.get<Rol_idDto[]>(`${environment.apiUrl}/usuario-rol/usuarioId/${idUsuario}`);
  }

  //falta probar
   updateRolServ(id:number, estado:string):Observable<any>{
    //aca se debe enviar el id del rol a eliminar
    return this._http.patch(`${environment.apiUrl}/usuario-rol/actualizarEstado/${id}`,{estado});

  }

}
