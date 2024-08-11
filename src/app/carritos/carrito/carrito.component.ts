import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/productos/model/producto';
import { ProductoService } from 'src/app/productos/service/producto.service';
import { Router } from '@angular/router';
import { Lote2 } from '../model/lote2';
import { CarritoService } from '../service/carrito.service';
import { LoteDto } from 'src/app/lotes/model/lote-dto';
import { MatDialog } from '@angular/material/dialog';

import { ModalFormularioProductoLoteComponent } from 'src/app/modals/modal-formulario-producto-lote/modal-formulario-producto-lote.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  title="";
  productoLote: LoteDto[] = [];
  total:number=0;
  //lotes: Lote2[] = [];
  //lote:Lote2=new Lote2(); 
  indice:number=0;
  constructor( 
    private dialog:MatDialog,
    private _router:Router,
    private productoServ:ProductoService,
    private carritoServ:CarritoService
    ) { }

  ngOnInit(): void {
    //cambiar el titulo y contenido
    this.carritoServ.currentTitle.subscribe(data => this.title = data);
    this.listarProductos();
  }

  agrargarCarritoEsi(){
    console.log("hola desde el carrito esi");   
  }

  listarProductos(){
    this.total=0;
    //listar producto al carritoESi
    this.productoLote =this.carritoServ.getProductosCarrito();
    this.calcularTotal();
  }

  quitarProducto(p:LoteDto){
    while(this.productoLote.length){
      if(p.producto==this.productoLote[this.indice].producto){
        //quitamos en producto en el servicio del carrito y volvemos a cargar la 
        this.carritoServ.quitarProducto(this.indice);
        this.indice=0;
        break;
      }
      this.indice++
      console.log("indice "+this.indice+ "  ");
    }
    console.log(this.productoLote);
    this.listarProductos();
  }


  retouchProductoLoteCarritoESI(productoLr:LoteDto){
    //modificar datos del lote seleccionado de la lista  
    const dialogRef = this.dialog.open(ModalFormularioProductoLoteComponent, {
      width: '450px',
      data:{ message: '¿Está seguro que desea añadir este lote al carrito?',
        pro:productoLr,id:productoLr.producto,retouch:true 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("objetoform:cccc ");
        console.log(result);
        this.quitarProducto(productoLr);
      }
    });
  }

  comprar1(){
    //rergistrar compra 
    this.carritoServ.keepOneDBLote1().subscribe({
      next: (response: HttpResponse<any>) => {
        if(response.status==201){
          console.log(JSON.stringify(response.body))
        }
    },error(error){
      console.log(error)
    }
  })
  }

  goToCompra(){
    this._router.navigate(['/compra/registrar'])
  }

  calcularTotal(){
    this.productoLote.forEach(producto => {
      this.total += producto.costoLote
    });
    console.log("toatl de la compra"+ this.total);
  } 

}
