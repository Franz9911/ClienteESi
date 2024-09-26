import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../model/proveedor';
import { ProveedorService } from '../service/proveedor.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-proveedor-registrar',
  templateUrl: './proveedor-registrar.component.html',
  styleUrls: ['./proveedor-registrar.component.css']
})
export class ProveedorRegistrarComponent implements OnInit {
  proveedor:Proveedor=new Proveedor();
  constructor(
    private proveedorService:ProveedorService
  ) {}

  ngOnInit(): void {
    this.createProveedor();
  }
  createProveedor(){
   const pro:Proveedor={
    id:0,
    nombre:"panchoProvedor",
    nit:"4321",
    tipo:"may",
    telefono:"123456789",
    condiciones_pago:"al contado",
    correo:"pancho@gmail.com",
    web:"panchoProv.com"
   }
    this.proveedorService.createProveedorServ(pro).subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.status==201){
          alert("Proveedor creado con exito");
        }
      },error:(error)=>{
        alert("Error al crear el proveedor: "+error);
      }
    })
  }

}
