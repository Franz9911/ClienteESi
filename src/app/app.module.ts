import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalFormularioProductoLoteComponent } from './modals/modal-formulario-producto-lote/modal-formulario-producto-lote.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
//productos
import { ProductoRegistrarComponent } from './productos/producto-registrar/producto-registrar.component';
import { ProductoListarComponent } from './productos/producto-listar/producto-listar.component';
//personas
import { PersonaListarComponent } from './personas/persona-listar/persona-listar.component';
import { PersonaRegistrarComponent } from './personas/persona-registrar/persona-registrar.component';
//carrito
import { CarritoComponent } from './carritos/carrito/carrito.component';
//lote
import { LoteRegistrarComponent } from './lotes/lote-registrar/lote-registrar.component';
import { LoteListarComponent } from './lotes/lote-listar/lote-listar.component';
//compras
import { CompraRegistrarComponent } from './compras/compra-registrar/compra-registrar.component';
import { CompraListarComponent } from './compras/compra-listar/compra-listar.component';

import { MensajeConfirmacionComponent } from './modals/mensaje-confirmacion/mensaje-confirmacion.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { UsuarioRegistrarComponent } from './usuarios/usuario-registrar/usuario-registrar.component';
import { RolesAsignarComponent } from './roles/roles-asignar/roles-asignar.component';

//proveedor
import { ProveedorRegistrarComponent } from './proveedores/proveedor-registrar/proveedor-registrar.component';





@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    //producto
    ProductoRegistrarComponent,
    ProductoListarComponent,
    //persona
    PersonaListarComponent,
    PersonaRegistrarComponent,
    //carrito
    CarritoComponent,
    //lote
    LoteRegistrarComponent,
    ModalFormularioProductoLoteComponent,
    //compra
    CompraRegistrarComponent,
    CompraListarComponent,
    MensajeConfirmacionComponent,
    LoteListarComponent,
    InicioSesionComponent,
    //usuario
    UsuarioRegistrarComponent,
    RolesAsignarComponent,
    //proveedor
    ProveedorRegistrarComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    library.add(fas);
  }
}
