import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/productos/model/producto';
import { LoteDto } from 'src/app/lotes/model/lote-dto';
import { CustomValidators } from 'src/app/utils/customValidators';
import { CarritoService } from 'src/app/carritos/service/carrito.service';

@Component({
  selector: 'app-modal-formulario-producto-lote',
  templateUrl: './modal-formulario-producto-lote.component.html',
  styleUrls: ['./modal-formulario-producto-lote.component.css']
})
export class ModalFormularioProductoLoteComponent implements OnInit {
  
  //confirmForm!: FormGroup;
  //producto!:Producto; 
  constructor(
    private carritoServ: CarritoService,
    private _router:Router,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormularioProductoLoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string ,pro:LoteDto,id:number,retouch:boolean }
  ) {}

  ngOnInit(
 

  ): void {
    if(this.data.retouch){
      this.loteForm?.get('unidades')?.setValue(this.data.pro.unidades);
      this.loteForm?.get('unidadesDispo')?.setValue(this.data.pro.unidadesDispo);
      this.loteForm?.get('costoLote')?.setValue(this.data.pro.costoLote);
      this.loteForm?.get('precioVentaLoteSugerido')?.setValue(this.data.pro.precioVentaLoteSugerido);
    }
    
  }
  productoL=this.data.pro
  

  loteForm = this.fb.group({
    unidades: new FormControl(0, [Validators.min(1), 
        Validators.required, 
        CustomValidators.onlyNumber]),
    unidadesDispo: new FormControl(0, [Validators.required, 
        Validators.min(0), 
        CustomValidators.onlyNumber]),
    costoLote: new FormControl(0,[Validators.required,
        Validators.min(1)]),
    precioVentaLoteSugerido: new FormControl(0,[Validators.required,
        Validators.min(0.5)]),
},{ //validacion para todo el formulario
    validators: [
        CustomValidators.debeSerMenorOIgual('unidades', 'unidadesDispo'),
        CustomValidators.profitMargin('precioVentaLoteSugerido','costoLote'),
    ]}
);

  onConfirm(): void {
    this.addToCarritoESI()
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }


  addToCarritoESI(){
    
    if (!this.loteForm?.errors) {
      //this.productoPopup
      const formValues = this.loteForm?.value;

      // Guarda los valores en un objeto, asignando valores por defecto si es necesario
      const unidades = formValues.unidades ?? 0; // Asigna 0 si unidades es null o undefined
      const unidadesDispo = formValues.unidadesDispo ?? 0; // Asigna 0 si unidadesDispo es null o undefined
      const precioVentaLoteSugerido=formValues.precioVentaLoteSugerido ?? 0;
      const costoLote=formValues.costoLote ?? 0;

      const nuevoLoteCarrito: LoteDto = {
        unidades: unidades,
        unidadesDispo: unidadesDispo,
        precioVentaLoteSugerido:precioVentaLoteSugerido,
        costoLote:costoLote,
        producto: this.data.id,
        imagen: this.productoL.imagen,
        nombre: this.productoL.nombre,
        descripcion: this.productoL.descripcion,
        modelo:this.productoL.modelo,
        marca:this.productoL.marca,
        idCompra:0,

      }
      console.log("objetoform: ");
      console.log(nuevoLoteCarrito);
      this.carritoServ.carritoESi(nuevoLoteCarrito);

    }

  }
}
