import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraServiceService } from '../service/compra-service.service';
import { CompraDto } from '../model/compra-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Compra } from '../model/compra';
import { faMagnifyingGlass ,faChevronLeft,faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-compra-listar',
  templateUrl: './compra-listar.component.html',
  styleUrls: ['./compra-listar.component.css']
})
export class CompraListarComponent implements OnInit {
  faMagnifyingGlass=faMagnifyingGlass;
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;
  ocultarFiltros=true;
  id:string="";
  estado:string="null"; 
  fechaReg:string="";
  fechaRecepcion:string="";
  metodoPago:string="null";
  
  compras: Compra[]=[]; //contiene todas la compras recibidas desde la db

  displayedColumns:String[]=['id','estado','fechaRegistro','fechaRecepcion','metodoPago']; //la tabla debe tener todos los campos del array 
  //o dara un error
  dataSource = new MatTableDataSource<Compra>();
  clickedRows=new Set<Compra>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(
    private _compraServ: CompraServiceService,
  ) { }

  ngOnInit(): void {
    //this.listAllCompras();
    this.filterCompras();
  }
  listAllCompras(){
    this._compraServ.listAllCompras(this.id,this.estado,this.fechaReg,this.metodoPago).subscribe({
      next:(response:Compra[])=>{
        this.compras=response;
        console.log(this.compras);
        // Asignar datos al dataSource y configurar el paginador
        this.dataSource.data = this.compras; 
        this.dataSource.paginator = this.paginator; 
      },error(error){
        alert("error al listar las compras por favor revise su conexcion");
        console.error("error: "+ error);
      }
    });
  }
  filterCompras(){
    console.log("Filtrar compras");
    console.log(this.id, this.estado, this.fechaReg,this.metodoPago);
    if(this.id==""){this.id="null"};
    if(this.fechaReg==""){this.fechaReg="null"};
    if(this.metodoPago==""){this.metodoPago="null"}
    this.listAllCompras();
  }
  ocultarVerFiltro(){
    if(this.ocultarFiltros){this.ocultarFiltros=false;}
    else{this.ocultarFiltros=true;}
  }

}
