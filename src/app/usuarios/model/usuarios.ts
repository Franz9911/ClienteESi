import { Persona } from "src/app/personas/model/persona";

export class Usuario {
    public id!: number;
    public nombreU!: string;
    public contrasenha!: string;
    public estado!: string;
    public correoE!:string;
    public direccion!:string;
    public persona!:Persona;
}