import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { IngresosComponent } from './ingresos/ingresos.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path:'productos',
        component:ProductosComponent
    },
    {
        path:'categorias',
        component:CategoriasComponent
    },
    {
        path:'proveedores',
        component: ProveedoresComponent
    },
    {
        path: 'ingresos',
        component: IngresosComponent,
        data: { tipo: 'ingresos' }
      },
      {
        path: 'salidas', 
        component: IngresosComponent,
        data: { tipo: 'salidas' }
      }
   

];
