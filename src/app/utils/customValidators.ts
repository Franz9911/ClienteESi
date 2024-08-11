import { group } from "@angular/animations";
import { AbstractControl,  FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export class CustomValidators extends Validators{
static onlyNumber(control : AbstractControl):ValidationErrors|null{
    return /^\d+$/.test(control.value)? null: { 'onlyNumber': true };
}
static debeSerMenorOIgual(primerControl:string,segundoControl:string):ValidatorFn{
  return (group:AbstractControl):ValidationErrors|null=>{
    const formGroup = group as FormGroup;
    const primerValor = formGroup.get(primerControl)?.value ?? 0;
    const segundoValor = formGroup.get(segundoControl)?.value ?? 0;
    // console.log("Primer valor:", primerValor);
    // console.log("Segundo valor:", segundoValor);
    if(primerValor<segundoValor)return {'debeSerMenorOIgual':true}
    else return null
    
  }
}
//margen de ganacias
static profitMargin(precioVenta:string, costoLote:string):ValidatorFn{
  return (group:AbstractControl): ValidationErrors | null => {
    const formGroup = group as FormGroup;
    const costoL = parseInt( formGroup.get(costoLote)?.value ?? 0);
    const precioV = formGroup.get(precioVenta)?.value ?? 0;
    console.log(costoL+costoL*0.3)
    return (precioV> costoL+costoL*0.3)? null : {'profitMargin':costoL+costoL*0.3}
  }
}
  
}
/*
export function compararConNumero(numeroAComparar: number): ValidatorFn {
    //compararconUnidadesAdquiridas
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valorIngresado = control.value;
      return valorIngresado <= numeroAComparar ? null : { menorOIgual: true };
    };
  }*/