import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { Lote } from '../model/lote';
import { CustomValidators } from 'src/app/utils/customValidators';
import { variationPlacements } from '@popperjs/core';

@Component({
    selector: 'app-lote-registrar',
    templateUrl: './lote-registrar.component.html',
    styleUrls: ['./lote-registrar.component.css'],
})
export class LoteRegistrarComponent implements OnInit {
    lote: Lote = new Lote();
    constructor(private fb:FormBuilder) {}

    ngOnInit(): void {}
        loteForm = this.fb.group({
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
            idProducto: new FormControl(null,[Validators.required,Validators.min(1)])
        },{ //validacion para todo el formulario
            validators: [
                CustomValidators.debeSerMenorOIgual('unidades', 'unidadesDispo'),
                CustomValidators.profitMargin('precioVentaLoteSugerido','costoLote'),
            ]}
        );
    
    
    enviar() {
    if (this.loteForm.valid) {
        // Obtén los valores del formulario
        const formValues = this.loteForm.value;
  
        // Guarda los valores en un objeto, asignando valores por defecto si es necesario
        const unidades = formValues.unidades ?? 0; // Asigna 0 si unidades es null o undefined
        const unidadesDispo = formValues.unidadesDispo ?? 0; // Asigna 0 si unidadesDispo es null o undefined

        this.lote.unidades= unidades
        //this.lote.unidadesDispo=unidadesDispo
        console.log("objeto: ")
        console.log(formValues)
    }
    
    }
}
