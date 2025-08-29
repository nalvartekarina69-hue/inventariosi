import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgregarComponent } from './agregar/agregar.component';
import { ProductosComponent } from './productos/productos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

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
        path:'ingresos',
        component:DashboardComponent
    },
    {
        path:'salidas',
        component:DashboardComponent
    },
    {
        path:'agregar',
        component:AgregarComponent
    }

];
