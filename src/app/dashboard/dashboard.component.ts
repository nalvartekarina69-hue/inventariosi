import { Component, inject} from '@angular/core';
import {  MatCardModule } from "@angular/material/card";
import { Categorias } from '../categorias';
import { CategoriasService } from '../services/categorias.service';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../productos';
import { Proveedores } from '../proveedores';
import { ProveedoresService } from '../services/proveedores.service';

interface EstadisticaItem {
  titulo: string;
  array: any[];
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  private categoriasService = inject(CategoriasService);
  private productoService = inject(ProductosService);
  private proveedoresService = inject(ProveedoresService);

  categorias: Categorias[]=[];
  productos: Productos[]=[];
  proveedores: Proveedores[]=[];
  listas: EstadisticaItem[] = [];
  constructor(){
    this.categorias = this.categoriasService.categorias;
    this.productos = this.productoService.productos;
    this.proveedores = this.proveedoresService.proveedores;

    this.crearListaEstadisticas();
  }
  
  private crearListaEstadisticas(): void {
    this.listas = [
      {
        titulo: 'Categorías',
        array: this.categorias
      },
      {
        titulo: 'Productos',
        array: this.productos
      },
      {
        titulo: 'Proveedores',
        array: this.proveedores
      }
    ];
  }
}
