import { Injectable, signal } from '@angular/core';
import { Ingresos } from '../ingresos';
import { MatTableDataSource } from '@angular/material/table';
@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private _ingresos = signal<Ingresos[]>([
    {
      id: 1,
      productoId: 2,
      proveedorId: 3,
      cantidad: 20,
      precioCompra: 2.30,
      precioVenta: 2.60,
      categoriaId: 2,
      fecha: new Date("2025-8-12"),
    },
    {
      id: 2,
      productoId: 2,
      proveedorId: 3,
      cantidad: 20,
      precioCompra: 2.30,
      precioVenta: 2.60,
      categoriaId: 2,
      fecha: new Date("2025-8-12"),
    }
  ])

  private dataSource = new MatTableDataSource<Ingresos>(this._ingresos());
   
  constructor() { 
    this.updateDataSource();
  }
  
  private updateDataSource(){
    this.dataSource.data = this._ingresos();
  }
  
  get ingresos() {
    return this._ingresos();
  }
  
   
  getDataSource(): MatTableDataSource<Ingresos>{
    return this.dataSource
  }
  
  update(ingreso: Ingresos): void {
    const ingresos = this._ingresos();
    const index = ingresos.findIndex(p => p.id === ingreso.id);
    
    if (index !== -1) {
      // Create a new array with the updated product
      const updatedIngresos = [
        ...ingresos.slice(0, index),
        ingreso,
        ...ingresos.slice(index + 1)
      ];
      
      // Update the signal
      this._ingresos.set(updatedIngresos);
      this.updateDataSource();
    }
  }
  
  add(ingreso: Ingresos): void {
    const ingresos = this._ingresos();
    
    // Generate a new ID (find max ID and increment)
    const maxId = Math.max(0, ...ingresos.map(p => p.id || 0));
    const newIngreso = {
      ...ingreso,
      id: maxId + 1
    };
    
    // Update the signal with a new array containing the new product
    this._ingresos.set([...ingresos, newIngreso]);
    this.updateDataSource();
  }
  
  delete(id: number): void {
    const ingresos = this._ingresos();
    const updatedIngresos = ingresos.filter(ingreso => ingreso.id !== id);
    
    // Update the signal
    this._ingresos.set(updatedIngresos);
    // Actualizar el dataSource manualmente
    this.updateDataSource();
  }
  
  }
  