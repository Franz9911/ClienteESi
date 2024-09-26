import { Component, OnInit, ViewChild } from '@angular/core';
import { Lote } from '../model/lote';
import { LoteServiceService } from '../service/lote-service.service';
import { Router } from '@angular/router';
import { LoteDto } from '../model/lote-dto';
import { LoteVista } from '../model/loteVista-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-lote-listar',
  templateUrl: './lote-listar.component.html',
  styleUrls: ['./lote-listar.component.css'],
})
export class LoteListarComponent implements OnInit {
   lotes: Lote[]=[]; 
  displayedColumns: string[] = ['nombre', 'id', 'genero','in'];

  dataSource = new MatTableDataSource<Lote>();
  clickedRows = new Set<Lote>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private loteServ:LoteServiceService,
    private _router:Router,
  ) { }
  ngOnInit(): void {
    
    this.listAllLotes();

  }


  listAllLotes(){
    console.log("Listar lote");
    this.loteServ.listLotes().subscribe({
      next:(response:Lote[])=>{
        this.lotes=response;
        console.log(this.lotes);
        this.dataSource.data = this.lotes; // Asignar datos al dataSource
        this.dataSource.paginator = this.paginator; 
      }
    });
  }
  verDato(dato:Lote){
    console.log(dato);
  }
  prueba(id:number){
    console.log("prueba"+ id);
  }
  prueba2(marca:string){
    console.log("prueba2"+ marca);
  }

}
