import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuarios';
import { UsuarioDto } from '../model/usuario-dto';
import { Persona } from 'src/app/personas/model/persona';
import { PersonaService } from 'src/app/personas/service/persona.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { RolesAsignarComponent } from 'src/app/roles/roles-asignar/roles-asignar.component';
import { RolesAsignarService } from 'src/app/roles/service/roles-asignar.service';

@Component({
  selector: 'app-usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrls: ['./usuario-registrar.component.css']
})
export class UsuarioRegistrarComponent implements OnInit {
  personas: Persona[] = [];
  personaAux:Persona= new Persona;
  usuario:Usuario =new Usuario; 
  usuarioRol:Usuario=new Usuario; //usuarios sera llevado para asignar roles
  idUsuarioRegistrado:number=0;
  constructor(
    private _personaService: PersonaService, 
    private _usuarioService: UsuarioService,
    private _rolesService:RolesAsignarService,
    private _router: Router,
    ) { }

  ngOnInit(): void {
    this.personaAux=this.usuario.persona; 
    this.listPersonas();
  }

  noCaracteresEspeciales(){
    const regex = /[{},()*]/;
    if(!regex.test(this.usuario.nombreU)){
      console.log(true);
    }else{
      console.log(false)
    }
    
  }
  //listar personas sin usuario para rellenar el formulario
  listPersonas(){
    console.log("hola")
    this._personaService.listPersonasSinUsuario().subscribe({
      next: (response: Persona[]) => {
        this.personas = response;
          //this.personas = response 
          //this.personas = response.map(persona => Object.create(null, Object.getOwnPropertyDescriptors(persona)));
        console.log(this.personas);
      }
    })
    
  }
  changePersona(persona:Persona){
    //this.usuario.persona = this.personaAux;
    this.personaAux=this.usuario.persona;
    console.log(persona);
  }
  registrarUsuario(){
    console.log(this.usuario);
    this._usuarioService.keepDBUsuario(this.usuario).subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.status==201){
          console.log(JSON.stringify(response.body));
          this.usuarioRol=response.body;
        }
      },error(error){
        console.log(error);
      }
    })

  }
  clearForm(){

  }
  asignarRoles(){
    console.log(this.usuarioRol.id);
    //negar esta condicion
    if(this.usuarioRol.id==undefined){
      this._rolesService.receiveUsuario(this.usuarioRol);
      this._router.navigate(['/EsiTech/rolesUsuario/asignar']);
    }else{
      alert("No hay usuario para asignar roles");
    }
    
  }
  confirmar(){
    alert("Usuario creado con exito");
  }
}
