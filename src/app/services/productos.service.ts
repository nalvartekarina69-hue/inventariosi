import { Injectable, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Productos } from '../productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
   
private _productos = signal<Productos[]>([
  
      {
        id: 1,
        nombre: 'FIDEOS CANUTO DON VICTORIO X 250G',
        codigo: 23456789,
        stock: 10,
        precioCompra: 2.10,
        precioVenta: 2.50,
        categoriaId: 3,
      },
      {
        id: 2,
        nombre: 'LECHE DESLACTOSADA GLORIA X 170G',
        codigo: 23474789,
        stock: 10,
        precioCompra: 2.10,
        precioVenta: 2.40,
        categoriaId: 2,
      },
      {
        id: 3,
        nombre: 'JAMON DE POLLO SAN FERNANDO X 24G',
        codigo: 15474789,
        stock: 2,
        precioCompra: 2.10,
        precioVenta: 1.40,
        categoriaId: 1,
      },
      {
        id: 4,
        nombre: 'FIDEOS TORNILLO DON VICTORIO X 250G',
        codigo: 23456789,
        stock: 10,
        precioCompra: 2.10,
        precioVenta: 2.50,
        categoriaId: 3,
      },
      {
        id: 5,
        nombre: 'LECHE LAIVE X 170G',
        codigo: 23474789,
        stock: 10,
        precioCompra: 2.10,
        precioVenta: 2.40,
        categoriaId: 2,
      },
      {
        id: 6,
        nombre: 'JAMON DE CERDO SAN FERNANDO X 24G',
        codigo: 15474789,
        stock: 2,
        precioCompra: 2.10,
        precioVenta: 1.40,
        categoriaId: 1,
      }
    
]);

private dataSource = new MatTableDataSource<Productos>(this._productos());
 
constructor() { 
  this.updateDataSource();
}

private updateDataSource(){
  this.dataSource.data = this._productos();
}

get productos() {
  return this._productos();
}

 
getDataSource(): MatTableDataSource<Productos>{
  return this.dataSource
}

getProductoName(id: number): string {
  const product = this._productos().find(p => p.id === id);
  return product ? product.nombre : '';
}

update(producto: Productos): void {
  const productos = this._productos();
  const index = productos.findIndex(p => p.id === producto.id);
  
  if (index !== -1) {
    // Create a new array with the updated product
    const updatedProductos = [
      ...productos.slice(0, index),
      producto,
      ...productos.slice(index + 1)
    ];
    
    // Update the signal
    this._productos.set(updatedProductos);
    this.updateDataSource();
  }
}

add(producto: Productos): void {
  const productos = this._productos();
  
  // Generate a new ID (find max ID and increment)
  const maxId = Math.max(0, ...productos.map(p => p.id || 0));
  const newProducto = {
    ...producto,
    id: maxId + 1
  };
  
  // Update the signal with a new array containing the new product
  this._productos.set([...productos, newProducto]);
  this.updateDataSource();
}

delete(id: number): void {
  const productos = this._productos();
  const updatedProductos = productos.filter(producto => producto.id !== id);
  
  // Update the signal
  this._productos.set(updatedProductos);
  // Actualizar el dataSource manualmente
  this.updateDataSource();
}

}
