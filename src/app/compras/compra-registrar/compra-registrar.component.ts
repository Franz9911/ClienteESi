import { Component, OnInit } from '@angular/core';
import { faTrashCan, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { CompraDto } from '../model/compra-dto';
import { CarritoService } from 'src/app/carritos/service/carrito.service';
import { HttpResponse } from '@angular/common/http';
import { CompraServiceService } from '../service/compra-service.service';
import { MensajeConfirmacionComponent } from 'src/app/modals/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-compra-registrar',
  templateUrl: './compra-registrar.component.html',
  styleUrls: ['./compra-registrar.component.css']
})
export class CompraRegistrarComponent implements OnInit {
  //compra = new Compra();
  compra:CompraDto= new CompraDto();
  
  constructor(
    private  carritoServ:CarritoService,
    private compraServ:CompraServiceService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.compra.id==undefined||this.compra.id==null){
      this.compra.estado="sol";
    }
    
  }
  //guardar compra
  keepCompra(c: CompraDto){
    //si el carrito tien un producto o mas
    this.compraServ.keepDBCompra(this.compra).subscribe({
      next:(response:HttpResponse<any>)=>{
        if(response.status==201){
          alert("Compra registrada con exito")
          console.log(JSON.stringify(response.body));
          if(this.carritoServ.getIsFullCarritoESI()){
            const id=response.body.id;
            console.log("id compra: " +id);
            this.addLotesCompra(id);
          }

        }
      },error(error){
        console.log(error);
      }
    })    
  }

  addLotesCompra(id:number){
   this.carritoServ.keepAllDBLotes(id).subscribe({
  })
}


  clearForm(){
    this.compra=new CompraDto();
    this.compra.estado="sol";
  }

  confirmar(){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '400px',
      data: { 
        message: '¿Está seguro que desea registrar la compra?',
        carritoLLeno: this.carritoServ.getIsFullCarritoESI(), 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.keepCompra(this.compra);
      }
    })
  }


}
