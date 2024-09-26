import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private autorizado:boolean=false; //cambiar al false  

  constructor(private http:HttpClient) { }
  verific(usuario:any){
    return this.http.post(`${environment.apiUrl}/autenticacion/login`,usuario,{
      observe:'response',headers:new HttpHeaders({
        'Content-Type':'application/json',
      })
    })
  }
  getIsUsuarioAutoriado(){
    if(sessionStorage.getItem("autorizado")=="true"){
      this.autorizado=true;
    } 
    return this.autorizado;
  }
  authorizedUsuario(){
      this.autorizado=true; //si autorizado es tru el usuario tiene acceso al ssitema deacuerdo a sus roles
      sessionStorage.setItem('autorizado',"true"); 
  }
  annularUsuario(){
    this.autorizado=false; //sin acceso al sistema
    console.log(this.autorizado);
  }
}
