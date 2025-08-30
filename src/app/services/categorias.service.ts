import { Injectable, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Categorias } from '../categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private _categorias = signal<Categorias[]>([
     {
      id: 1,
      nombre: 'EMBUTIDOS',
      descripcion: 'todo jamon, chorizo, parrilleros'
    },
    {
      id: 2,
      nombre: 'LACTEOS Y HUEVOS',
      descripcion: 'todo leche, leche condensada, manjares, huevos'
    },
    {
      id: 3,
      nombre: 'FIDEOS, PASTAS Y SALSAS',
      descripcion: 'todo fideos, pastas, cremas, salsas'
    },
    {
      id: 4,
      nombre: 'ACEITES',
      descripcion: 'todo tipo de aceites soya, oliva, arroz'
    }
  ]);

  // Crear una instancia única del MatTableDataSource
  private dataSource = new MatTableDataSource<Categorias>(this._categorias());

  constructor() {
    // Suscribirse a los cambios del signal para actualizar el dataSource
    this.updateDataSource();
  }
  
  private updateDataSource() {
    this.dataSource.data = this._categorias();
  }

  get categorias() {
    return this._categorias();
  }
  
  getDataSource(): MatTableDataSource<Categorias>{
    return this.dataSource; 
  }

  getCategoryName(id: number): string {
    const category = this._categorias().find(p => p.id === id);
    return category ? category.nombre : '';
  }

  update(categoria: Categorias): void {
    const categorias = this._categorias();
    const index = categorias.findIndex(p => p.id === categoria.id);
    
    if (index !== -1) {
      // Create a new array with the updated category
      const updatedCategorias = [
        ...categorias.slice(0, index),
        categoria,
        ...categorias.slice(index + 1)
      ];
      
      // Update the signal
      this._categorias.set(updatedCategorias);
      // Actualizar el dataSource manualmente
      this.updateDataSource();
    }
  }
  
  add(categoria: Categorias): void {
    const categorias = this._categorias();
    
    // Generate a new ID (find max ID and increment)
    const maxId = Math.max(0, ...categorias.map(p => p.id || 0));
    const newCategoria = {
      ...categoria,
      id: maxId + 1
    };
    
    // Update the signal with a new array containing the new category
    this._categorias.set([...categorias, newCategoria]);
    // Actualizar el dataSource manualmente
    this.updateDataSource();
  }

  delete(id: number): void {
    const categorias = this._categorias();
    const updatedCategorias = categorias.filter(categoria => categoria.id !== id);
    
    // Update the signal
    this._categorias.set(updatedCategorias);
    // Actualizar el dataSource manualmente
    this.updateDataSource();
  }
}