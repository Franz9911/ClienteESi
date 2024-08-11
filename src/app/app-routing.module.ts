import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';

import { ProductoRegistrarComponent } from './productos/producto-registrar/producto-registrar.component';
import { ProductoListarComponent } from './productos/producto-listar/producto-listar.component';

import { PersonaListarComponent } from './personas/persona-listar/persona-listar.component';
import { PersonaRegistrarComponent } from './personas/persona-registrar/persona-registrar.component';

import { CarritoComponent } from './carritos/carrito/carrito.component';

import { LoteRegistrarComponent } from './lotes/lote-registrar/lote-registrar.component';

import { CompraRegistrarComponent } from './compras/compra-registrar/compra-registrar.component';
const routes: Routes = [
  { path: '', 
  component: PrincipalComponent,
    children:[
      {path: 'producto/registrar',component: ProductoRegistrarComponent},
      {path:'persona/registrar',component:PersonaRegistrarComponent},
      {path: 'persona/listar',component: PersonaListarComponent},
      {path: 'producto/listar',component:ProductoListarComponent},
      {path: 'carrito',component:CarritoComponent},
      {path: 'lote/registrar',component:LoteRegistrarComponent},
      {path: 'compra/registrar',component:CompraRegistrarComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
