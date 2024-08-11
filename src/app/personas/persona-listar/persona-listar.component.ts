import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/personas/service/persona.service';
import { Persona } from 'src/app/personas/model/persona';
import { PersonaDto } from '../model/persona-dto';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { RegistroPersona } from '../model/registro-persona';

import { faCoffee, faUserPen, faUserSlash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-persona-listar',
  templateUrl: './persona-listar.component.html',
  styleUrls: ['./persona-listar.component.css']
})
export class PersonaListarComponent implements OnInit {
  faCoffee = faCoffee;
  faUserPen = faUserPen;
  faUserSlash = faUserSlash;
  
  nombre: string="";
  registrosPersonas:any=[];
  registroPersona: RegistroPersona = new RegistroPersona();
  //personas: PersonaDto[] = [];
  personas: Persona[] = [];
  persona: PersonaDto = new PersonaDto();

  constructor(private _personaService: PersonaService, private _router: Router) { }
  //constructor(private _router: Router) {   }
  ngOnInit(): void {
    this.listar();
  }
  listar() {
    console.log("hola")
    this._personaService.listar().subscribe({
      next: (response: Persona[]) => {
        console.log(JSON.stringify(response));
        this.registrosPersonas = response;
          //this.personas = response 
          this.personas = response.map(persona => Object.create(null, Object.getOwnPropertyDescriptors(persona)));
        console.log(this.personas);
          
          console.log(this.registrosPersonas);
          console.log(this.personas[1].nombre);
      }
    })

  }
  eliminar(id: number) {
   
  }
  editar(p:Persona) {
    console.log("hola: ")
    console.log(p)
  }
  agregar(persona: Persona) {
    
  }
  activar(id:number){}
  imprimir(persona:Persona){}
}
