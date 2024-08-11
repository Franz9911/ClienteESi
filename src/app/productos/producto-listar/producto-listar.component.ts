import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/producto';
import { LoteDto } from 'src/app/lotes/model/lote-dto';
import { faTrashCan, faScrewdriverWrench,faTriangleExclamation,faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { ProductoService } from '../service/producto.service';
import { CarritoService } from 'src/app/carritos/service/carrito.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/utils/customValidators';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormularioProductoLoteComponent } from 'src/app/modals/modal-formulario-producto-lote/modal-formulario-producto-lote.component';


@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css']
})
export class ProductoListarComponent implements OnInit {
  faTrashCan=faTrashCan;
  faScrewdriverWrench=faScrewdriverWrench;
  faTriangleExclamation=faTriangleExclamation;
  faSkullCrossbones=faSkullCrossbones;

  displayStylePopupLote = "none";

  productos: Producto[] = []; 
  productoPopup: Producto = new Producto();
  loteCarrito:LoteDto=new LoteDto();  
  

  constructor(
    private fb:FormBuilder,
    private productoServ: ProductoService,
    private dialog: MatDialog,
    private carritoServ: CarritoService) { }

  ngOnInit(): void {
    this.listProductos();
  }
  editar(producto:Producto){}
  eliminar(id:number){}
  
  listProductos(){
    this.productoServ.listarTodosProductos().subscribe({
      next: (response: Producto[]) => {
        this.productos=response
        console.log(this.productos)
      }
    })
  }

  //Agregar al carritoESI
  addLote(producto:Producto){
    console.log("prueba")
    //this.carritoServ.carritoESi(producto);
    //this.openModalLote(producto);
    const dialogRef = this.dialog.open(ModalFormularioProductoLoteComponent, {
      width: '450px',
      data:{ message: '¿Está seguro que desea añadir este lote al carrito?',pro:producto,id:producto.id,retouch:false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("objetoform: ");
        //console.log(nuevoLoteCarrito);
        //this.carritoServ.carritoESi(nuevoLoteCarrito);
        this.closeModalLote();
      }
    });
  }
  //elimar 
  addToCarritoESI(){
    if (this.loteForm.valid) {
      this.productoPopup
      const formValues = this.loteForm.value;

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
        producto: this.productoPopup.id,
        imagen: this.productoPopup.imagen,
        nombre: this.productoPopup.nombre,
        descripcion: this.productoPopup.descripcion,
        modelo:this.productoPopup.modelo,
        marca:this.productoPopup.marca,
        idCompra:0,
      }
      console.log("objetoform: ");
      console.log(nuevoLoteCarrito);
      this.carritoServ.carritoESi(nuevoLoteCarrito);
      this.closeModalLote();
    }
  }
//editar producto ue vienen desde el carrito esi
  editProductoCarritoESI(){
    console.log("hola tarola");
    this.loteForm.patchValue({'unidades':2});
    this.openModalLote(this.productoPopup)
  }

  //formulario reactivo
  loteForm=this.fb.group({
    unidades: new FormControl(0, [Validators.min(1), 
      Validators.required, 
      CustomValidators.onlyNumber]),
    unidadesDispo: new FormControl(0, [Validators.required, 
      Validators.min(0), 
      CustomValidators.onlyNumber]),
    costoLote: new FormControl(0,[Validators.required,
      Validators.min(1)]),
    precioVentaLoteSugerido: new FormControl(null,[Validators.required,
      Validators.min(0.5)]),
  },{
    validators: [CustomValidators.debeSerMenorOIgual('unidades','unidadesDispo'),
    CustomValidators.profitMargin('precioVentaLoteSugerido','costoLote'),
    ]
  });

  //modal-formulario para lote
  closeModalLote(){
    this.displayStylePopupLote="none";
    this.loteForm.reset();
  }
  openModalLote(pro:Producto){
    this.productoPopup=pro;
    this.displayStylePopupLote="flex";
  }

}
