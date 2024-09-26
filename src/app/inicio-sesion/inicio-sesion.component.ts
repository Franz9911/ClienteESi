import { Component, OnInit } from '@angular/core';
import  {Router } from '@angular/router'
import { LoginService } from './service/login.service';
import { HttpResponse } from '@angular/common/http';
import { UsuarioService } from '../usuarios/service/usuario.service';
import { Usuario } from '../usuarios/model/usuarios';
import { Observable, lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  roles:any[]=[];
  ocultarContrasenha:string="password";
  ocultarContrasenhaTexto:string="Ver la contraseña";
  usuarioL={
    nombreU:"",
    contrasenha:""
  };
  constructor(
    private loginServ:LoginService,
    private router:Router,
    private usuarioServ:UsuarioService,
    ) { }

  ngOnInit(): void {
  }
  viewContrasenha(){
    if(this.ocultarContrasenha=="password"){
      this.ocultarContrasenha="text";
      this.ocultarContrasenhaTexto="Ocultar la contraseña";
    }else{
      this.ocultarContrasenha="password";
      this.ocultarContrasenhaTexto="Ver la contraseña";
    }
  }
  //enviamos las Credenciales para validar al usuario 
  //enviamos un usuario y contraseña
  //recibimos un token access y el id del usurio
  async sendCredentials(){
    //console.log(this.usuarioL)
    //this.router.navigate(['/EsiTech']);
    try{
      const response = await lastValueFrom(this.loginServ.verific(this.usuarioL) as Observable<HttpResponse<any>>);
      if(response.status==201 ){
        if(response.body ){
          console.log(JSON.stringify(response.body));
          sessionStorage.setItem('usuario',this.usuarioL.nombreU);
          sessionStorage.setItem('token',response.body.access_token);
          this.loginServ.authorizedUsuario();
          //vamos a recuperar los roles del usuario desde la db con su id
          await this.getRolesUsuario(response.body.idU);
        }
          alert("Bienvenido");
          this.router.navigate(['/EsiTech']);
      }
    }catch{
      alert("Error en el login");
    }
  }

  //obtener los roles del usuario   que inicio sesion 
  //usando usuarioService 
  //pasando como parametro la id del usuario
  async getRolesUsuario(usuarioId:number){ 
    console.log("entramos a agarrar los roles" + usuarioId)
    try{
      const response =await lastValueFrom(this.usuarioServ.listRoles(usuarioId) );
      console.log( response);
      const usuarioRoles=response;
      usuarioRoles.forEach(element => {
        if(element.estado=="act"){
          this.roles.push(element.rol)
        } 
      });
      console.log(this.roles); 
      sessionStorage.setItem('roles',JSON.stringify(this.roles));
    }catch{

    }
  }

}
