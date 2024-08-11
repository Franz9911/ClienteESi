import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/personas/service/persona.service';
import { Persona } from 'src/app/personas/model/persona';
import { Router } from '@angular/router';
import { PersonaDto } from '../model/persona-dto';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-persona-registrar',
  templateUrl: './persona-registrar.component.html',
  styleUrls: ['./persona-registrar.component.css']
})
export class PersonaRegistrarComponent implements OnInit {
  persona1: PersonaDto = new PersonaDto();
  persona:Persona=new Persona();
  nombre:string="";

  constructor(
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.persona=new Persona();
  }
  registraPersona(){
    console.log("Registro de persona");
    this.personaService.guardar(this.persona).subscribe({
      next: (response: HttpResponse<any>) => {
        if(response.status==201){
          //alert('Response body:' + JSON.stringify(response.body));
        }
      },error:(error)=>{
        alert(JSON.stringify(error));
      }
    });    
  }

}
