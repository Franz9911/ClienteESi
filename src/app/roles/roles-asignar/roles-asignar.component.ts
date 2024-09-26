import { Component, OnInit } from '@angular/core';
import { RolesAsignarService } from '../service/roles-asignar.service';
import { Usuario } from 'src/app/usuarios/model/usuarios';
import { CreateUsuarioRolDto } from '../model/usuario-rol-dto';
import { HttpResponse } from '@angular/common/http';
import { Rol_idDto } from '../model/rol-id-dto';
import { faTrashCan, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-roles-asignar',
  templateUrl: './roles-asignar.component.html',
  styleUrls: ['./roles-asignar.component.css']
})
export class RolesAsignarComponent implements OnInit {
  faTrashCan=faTrashCan;
  faSquareCheck=faSquareCheck;

  usuarioAux:Usuario=new Usuario(); //contiene los datos del usuario que al que asignaremos o quitaremos los roles   
  usuarioRol:CreateUsuarioRolDto=new CreateUsuarioRolDto; //este es el tipo de objeto que recibimos al crear y actualizar   
  roles:Rol_idDto[]=[]; //roles de usuarioAux 
  admi_1:boolean=false;
  serT_2:boolean=false;
  vent_3:boolean=false;

  usuarioNuevo:boolean=true;
  constructor(
    private rolesAsignarService:RolesAsignarService,
  ) { }

  ngOnInit(): void {
    this.getUsuario();
    this.searchRoles()
    
  }
  async getUsuario(){
    console.log("rolesAsing");
    console.log(this.usuarioAux);
     this.usuarioAux= this.rolesAsignarService.getUsarioServ();
  }

  //funcion llamada desde la ui donde recibimos el id del rol 1,2,3
  async removeRol(idRol:number){
    this.roles.forEach(element => {
      if(element.rol.id==idRol){
        console.log(element);
        //solo desactiva el rol no lo eliminara
         this.updateRol(element.id,"ina")
      }
    });
    //await this.searchRoles();
  }

  //funcion llamada desde la ui donde recibimos el id del rol 1,2,3
  async addRol(idRol:number){
    let bandera=true; 
    this.usuarioRol.idUsuario=6;
    this.usuarioRol.idRol=idRol;
      if(this.roles.length>0){ //verifica que roles no este vacio
        this.roles.forEach(element => {
          if(element.rol.id==idRol){ //si el id de rol es encontrado se ira a actualizar el estado a activo 
            bandera=false;
            console.log("ya esta asignado");
            this.updateRol(element.id,"act");
            //this.searchRoles(); 
          }
        });
        if(bandera){ //si no esta asignado se ira a crear un nuevo rol
          this.createRol();
        }
      }else{ //si roles esta vacio iremos a crear un nuevo rol
        this.createRol();
    }
    this.searchRoles(); 
  }

  async createRol(){
    this.rolesAsignarService.addRolesServ(this.usuarioRol).subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.status==201){
          alert("Rol asignado correctamente");
          console.log(response.body);
          this.searchRoles();
        }
      },error:(error)=>{
        console.log("error en el regsitro de roles"+error);
      }
    })
  }

  //buscar roles del usuario
   async searchRoles(){
    console.log("search roles");
    //buscar los roles del usuario en el service enviando el id del usuario como parametro  
    this.rolesAsignarService.getRolesServ(6).subscribe({
      next:(response:Rol_idDto[])=>{
        this.roles=response;
        console.log(this.roles);
        const nombreRoless=response.filter(
          role => role.estado==='act'
        ).map(role =>role.rol.nombre);
        //estas variables modifican la pantalla para asignar roles
        this.admi_1=nombreRoless.includes('Admi-1');
        this.serT_2=nombreRoless.includes('SerT-2');
        this.vent_3=nombreRoless.includes('Vent-3');
      }
    })

  }
  //actualizar estado del rol enviamos como parametro el id del usuarioRol y el estado
  async updateRol(id:number,nuevoEstado:string ){
    this.rolesAsignarService.updateRolServ(id, nuevoEstado).subscribe({
      next: (response: HttpResponse<Rol_idDto>) => {
        console.log("response "+JSON.stringify(response));
        if (response.status == 200) {
          //alert("Rol eliminado correctamente");
          this.searchRoles();
        }
      }
    })
  }


}
