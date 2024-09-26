import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CarritoService } from '../carritos/service/carrito.service';
import { LoginService } from '../inicio-sesion/service/login.service';
import { UsuarioService } from '../usuarios/service/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  nombreApp = 'Sistema de gestion ESI-Tech';
  nombreUsuario = '';
  idRolSeleccionado = 0;

  card=faCartShopping;
  roles: any;

  mostrarModuloPersona: boolean = false;
  mostrarModuloSolicitudServicio: boolean = false;
  mostrarModuloFalla: boolean = false;
  mostrarModuloActivo: boolean = false;
  mostrarModuloOrdenesTrabajo: boolean = false;
  mostrarModuloMantenimientoCorrectivo: boolean = false;
  mostrarModuloUsuario: boolean = false;

  mostrarModuloPersonaEnlaceLista: boolean = false;
  mostrarModuloSolicitudServicioEnlaceLista: boolean = false;
  mostrarModuloSolicitudServicioEnlaceRegistro: boolean = false;
  mostrarModuloFallaEnlaceLista: boolean = false;
  mostrarModuloActivoEnlaceLista: boolean = false;
  mostrarModuloOrdenesTrabajoEnlaceLista: boolean = false;
  mostrarModuloOrdenesTrabajoEnlaceRegistro: boolean = false;
  mostrarModuloMantenimientoCorrectivoEnlaceLista: boolean = false;
  mostrarModuloUsuarioEnlaceAsignacionRol: boolean = false;

  constructor(
    private _router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private carritoServ: CarritoService,
    private loginServ:LoginService,
    
  ) { }

  ngOnInit(): void {
    this.nombreUsuario=sessionStorage.getItem('usuario')+"";
    const rolesAux=sessionStorage.getItem('roles');
    if(rolesAux!=null ){
      this.roles=JSON.parse(rolesAux);
      console.log("roles user: ");
      console.log(this.roles);
    }else{
      alert("el usuarios no tiene ningun rol asignado solicita tus credenciales al adminstrador")
    }
    if (!this.loginServ.getIsUsuarioAutoriado()) {
      this._router.navigate(['/']);
    }


    
    
  }

  obtenerFecha(): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaActual = new Date();
    return fechaActual.toLocaleDateString('es-ES', options);
  }

  seleccionarRol(event: any) {
    const idRol = event.target.value;
    sessionStorage.setItem('roLSelecionado', idRol);
    //this.verificarRoles(idRol);
  }
  //ir la carrito esi
  goToCarritoESI(){
    console.log("hola desde el carrito");
    this.carritoServ.changeTitle("carrito ESI");
    //"skipLocationChange: true" forzar la recarga del componente carrito.
    this._router.navigate(['/EsiTech/carrito'], { skipLocationChange: true }).then(() => {
      this._router.navigate(['/EsiTech/carrito']);
    });
  }

    //ir la carrito cliente
    goToCarritoCliente(){
      console.log("hola desde el carrito");
      this.carritoServ.changeTitle("Carrito Cliente");
      // "skipLocationChange: true" forzar la recarga del componente carrito.
      this._router.navigate(['/carrito'], { skipLocationChange: true }).then(() => {
        this._router.navigate(['/carrito']);
      });

    }
  cerrarSesion() {
    sessionStorage.removeItem('idRol');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
    sessionStorage.clear();
    this.loginServ.annularUsuario();
    this._router.navigate(['/']);
  }

  verificarRoles(idRol = 0){
    if(idRol == 1){//Administrador
      this.mostrarModuloPersona = true;
      this.mostrarModuloSolicitudServicio = true;
      this.mostrarModuloFalla = true;
      this.mostrarModuloActivo = true;
      this.mostrarModuloOrdenesTrabajo = true;
      this.mostrarModuloMantenimientoCorrectivo = true;
      this.mostrarModuloUsuario = true;
    
      this.mostrarModuloPersonaEnlaceLista = true;
      this.mostrarModuloSolicitudServicioEnlaceLista = true;
      this.mostrarModuloSolicitudServicioEnlaceRegistro = true;
      this.mostrarModuloFallaEnlaceLista = true;
      this.mostrarModuloActivoEnlaceLista = true;
      this.mostrarModuloOrdenesTrabajoEnlaceLista = true;
      this.mostrarModuloOrdenesTrabajoEnlaceRegistro = true;
      this.mostrarModuloMantenimientoCorrectivoEnlaceLista = true;
      this.mostrarModuloUsuarioEnlaceAsignacionRol = true;

    } else if(idRol == 2){//Técnico
      this.mostrarModuloPersona = false;
      this.mostrarModuloSolicitudServicio = false;
      this.mostrarModuloFalla = true;
      this.mostrarModuloActivo = true;
      this.mostrarModuloOrdenesTrabajo = true;
      this.mostrarModuloMantenimientoCorrectivo = true;
      this.mostrarModuloUsuario = false;
    
      this.mostrarModuloPersonaEnlaceLista = false;
      this.mostrarModuloSolicitudServicioEnlaceLista = false;
      this.mostrarModuloSolicitudServicioEnlaceRegistro = false;
      this.mostrarModuloFallaEnlaceLista = true;
      this.mostrarModuloActivoEnlaceLista = true;
      this.mostrarModuloOrdenesTrabajoEnlaceLista = true;
      this.mostrarModuloOrdenesTrabajoEnlaceRegistro = true;
      this.mostrarModuloMantenimientoCorrectivoEnlaceLista = true;
      this.mostrarModuloUsuarioEnlaceAsignacionRol = false;

    } else if(idRol== 3){//Planificador
      this.mostrarModuloPersona = true;
      this.mostrarModuloSolicitudServicio = true;
      this.mostrarModuloFalla = false;
      this.mostrarModuloActivo = false;
      this.mostrarModuloOrdenesTrabajo = true;
      this.mostrarModuloMantenimientoCorrectivo = true;
      this.mostrarModuloUsuario = false;
    
      this.mostrarModuloPersonaEnlaceLista = true;
      this.mostrarModuloSolicitudServicioEnlaceLista = true;
      this.mostrarModuloSolicitudServicioEnlaceRegistro = true;
      this.mostrarModuloFallaEnlaceLista = false;
      this.mostrarModuloActivoEnlaceLista = false;
      this.mostrarModuloOrdenesTrabajoEnlaceLista = true;
      this.mostrarModuloOrdenesTrabajoEnlaceRegistro = true;
      this.mostrarModuloMantenimientoCorrectivoEnlaceLista = true;
      this.mostrarModuloUsuarioEnlaceAsignacionRol = false;
    } else if(idRol == 4){//Cliente
      this.mostrarModuloPersona = false;
      this.mostrarModuloSolicitudServicio = true;
      this.mostrarModuloFalla = true;
      this.mostrarModuloActivo = true;
      this.mostrarModuloOrdenesTrabajo = true;
      this.mostrarModuloMantenimientoCorrectivo = true;
      this.mostrarModuloUsuario = false;
    
      this.mostrarModuloPersonaEnlaceLista = false;
      this.mostrarModuloSolicitudServicioEnlaceLista = true;
      this.mostrarModuloSolicitudServicioEnlaceRegistro = true;
      this.mostrarModuloFallaEnlaceLista = true;
      this.mostrarModuloActivoEnlaceLista = true;
      this.mostrarModuloOrdenesTrabajoEnlaceLista = true;
      this.mostrarModuloOrdenesTrabajoEnlaceRegistro = true;
      this.mostrarModuloMantenimientoCorrectivoEnlaceLista = true;
      this.mostrarModuloUsuarioEnlaceAsignacionRol = false;
    }
  }

}
