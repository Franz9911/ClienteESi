import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';

import { ProductoRegistrarComponent } from './productos/producto-registrar/producto-registrar.component';
import { ProductoListarComponent } from './productos/producto-listar/producto-listar.component';

import { PersonaListarComponent } from './personas/persona-listar/persona-listar.component';
import { PersonaRegistrarComponent } from './personas/persona-registrar/persona-registrar.component';

import { CarritoComponent } from './carritos/carrito/carrito.component';

import { LoteRegistrarComponent } from './lotes/lote-registrar/lote-registrar.component';
import { LoteListarComponent } from './lotes/lote-listar/lote-listar.component';

import { CompraRegistrarComponent } from './compras/compra-registrar/compra-registrar.component';
import { CompraListarComponent } from './compras/compra-listar/compra-listar.component';

import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';

import { UsuarioRegistrarComponent } from './usuarios/usuario-registrar/usuario-registrar.component';
import { RutasProtegidasGuard } from './inicio-sesion/rutas-protegidas.guard';

import { RolesAsignarComponent } from './roles/roles-asignar/roles-asignar.component';

import { ProveedorRegistrarComponent } from './proveedores/proveedor-registrar/proveedor-registrar.component';
const routes: Routes = [
  {
    path: '',
    component: InicioSesionComponent,
    children:[],
  },
  { path: 'EsiTech', 
  component: PrincipalComponent,canActivate:[RutasProtegidasGuard],
    children:[
      {path: 'producto/registrar',component: ProductoRegistrarComponent},
      {path:'persona/registrar',component:PersonaRegistrarComponent},
      {path: 'persona/listar',component: PersonaListarComponent},
      {path: 'producto/listar',component:ProductoListarComponent},
      {path: 'carrito',component:CarritoComponent},
      {path: 'lote/registrar',component:LoteRegistrarComponent},
      {path: 'lote/listar',component:LoteListarComponent},
      {path: 'compra/registrar',component:CompraRegistrarComponent},
      {path: 'compra/listar',component:CompraListarComponent},
      {path: 'usuario/registrar',component:UsuarioRegistrarComponent},
      {path: 'rolesUsuario/asignar',component:RolesAsignarComponent},
      {path: 'proveedor/registrar',component:ProveedorRegistrarComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
