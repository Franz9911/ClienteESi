import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../model/producto';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-producto-registrar',
  templateUrl: './producto-registrar.component.html',
  styleUrls: ['./producto-registrar.component.css']
})
export class ProductoRegistrarComponent implements OnInit {
  producto:Producto=new Producto();
  formatoArchivo:boolean=false;
  //forulario para eviar la img al serv
  formImg:FormData=new FormData()
  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
  }
  cargarImg(event:Event) {
    //this.imagen = event.target.files[0];
    const imgf=event.target as HTMLInputElement;
    const file: FileList  | null= imgf.files
    if(file){
      //cargando el archivo imagen a un formulario 
      this.formImg.append('imgfile',file[0]);
      this.producto.imagen=file[0].name;
     //recogiendo la extencion del archivo para comprobar que es una img
      const ax: string[]  =this.producto.imagen.split(".");  
      console.log( "extencion "+ ax[1]);
      //validando el formato de la img 
      if(ax[1]=="jpg" || ax[1]=="png" || ax[1]=="jpeg"  ){
        this.formatoArchivo=true;
      }
    }
  }
  registrar(){
    console.log("Registrando producto");
    if(this.producto.imagen==undefined || this.formatoArchivo){
      this.productoService.registrarProductos(this.producto).subscribe({
        next:(response:HttpResponse<any>)=>{
          if(response.status==201){
            alert("Producto registrado"+ JSON.stringify(response.body));
            if(this.producto.imagen){
              this.registrarImg();
            }
          }
        },error:(error)=>{
          alert("Error al registrar producto "+error);
        }
      });
    }else{
      alert("Formato de imagen no valido");
    }
  }

  registrarImg(){
    console.log("Registrando imagen");
    this.productoService.registraAchivoImg(this.formImg).subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.status==201){
          alert("Imagen registrada");
        }
      },error:(e)=>{
        alert("Error al registrar imagen "+e);
        console.log(e);
      },complete() {
          alert("Imagen registrada");
      },
    })
  }

}
