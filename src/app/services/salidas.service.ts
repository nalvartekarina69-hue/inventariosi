import { Injectable, signal } from '@angular/core';
import { Ingresos } from '../ingresos';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  private _salidas = signal<Ingresos[]>([
    {
      id: 1,
      productoId: 2,
      proveedorId: 3,
      cantidad: 10,
      precioCompra: 2.30,
      precioVenta: 2.60,
      categoriaId: 2,
      fecha: new Date("2025-8-24"),
    },
    {
      id: 2,
      productoId: 2,
      proveedorId: 3,
      cantidad: 5,
      precioCompra: 2.30,
      precioVenta: 2.60,
      categoriaId: 2,
      fecha: new Date("2025-8-24"),
    }
  ])
   private dataSource = new MatTableDataSource<Ingresos>(this._salidas());
     
    constructor() { 
      this.updateDataSource();
    }
    
    private updateDataSource(){
      this.dataSource.data = this._salidas();
    }
    
    get salidas() {
      return this._salidas();
    }
    
     
    getDataSource(): MatTableDataSource<Ingresos>{
      return this.dataSource
    }
    
    update(salida: Ingresos): void {
      const salidas = this._salidas();
      const index = salidas.findIndex(p => p.id === salida.id);
      
      if (index !== -1) {
        // Create a new array with the updated product
        const updatedSalidas = [
          ...salidas.slice(0, index),
          salida,
          ...salidas.slice(index + 1)
        ];
        
        // Update the signal
        this._salidas.set(updatedSalidas);
        this.updateDataSource();
      }
    }
    
    add(salida: Ingresos): void {
      const salidas = this._salidas();
      
      // Generate a new ID (find max ID and increment)
      const maxId = Math.max(0, ...salidas.map(p => p.id || 0));
      const newSalidas = {
        ...salida,
        id: maxId + 1
      };
      
      // Update the signal with a new array containing the new product
      this._salidas.set([...salidas, newSalidas]);
      this.updateDataSource();
    }
    
    delete(id: number): void {
      const salidas = this._salidas();
      const updatedSalidas = salidas.filter(salida => salida.id !== id);
      
      // Update the signal
      this._salidas.set(updatedSalidas);
      // Actualizar el dataSource manualmente
      this.updateDataSource();
    }
    
}
    
