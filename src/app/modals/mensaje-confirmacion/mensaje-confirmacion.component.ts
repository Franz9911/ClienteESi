import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.component.html',
  styleUrls: ['./mensaje-confirmacion.component.css']
})
export class MensajeConfirmacionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MensajeConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string,datosDeObjeto:any, carritoLLeno:boolean,origen:string}
  ) { }
    
  entries: [string, any][] = [];
  ngOnInit(): void {
    console.log(this.data.carritoLLeno);
    this.entries = Object.entries(this.data.datosDeObjeto);
    
  }
  onConfirm(): void {
    this.dialogRef.close(true);
    
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
