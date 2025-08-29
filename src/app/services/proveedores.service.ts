import { Injectable, signal } from '@angular/core';
import { Proveedores } from '../proveedores';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})

export class ProveedoresService {
  private _proveedores = signal<Proveedores[]>([
    {
      id: 1,
      nombre: 'Almacen Mayorista',
      razonSocial: 'Almacen Mayorista de Abarrotes S.A.C',
      telefono: 954357232,
      direccion: 'Jr. Salvador Cavero 210-Nazareno',
      correo:'amayoristasac@gmail.com'
    },
    {
      id: 2,
      nombre: 'Produsana',
      razonSocial: 'Produsana S.A.C',
      telefono: 966357432,
      direccion: 'Av Mariscal Caceres 1299',
      correo:'produsanasac@gmail.com'
    },
    {
      id: 3,
      nombre: 'Distribuidora Atix',
      razonSocial: 'Distribuidora Atix S.A.C',
      telefono: 966919232,
      direccion: 'Jr. Miguel Grau 726',
      correo:'atixdistribuidora@gmail.com'
    }
  ]);

  // Crear una instancia única del MatTableDataSource
  private dataSource = new MatTableDataSource<Proveedores>(this._proveedores());

  constructor() {
    // Suscribirse a los cambios del signal para actualizar el dataSource
    this.updateDataSource();
  }
  
  private updateDataSource() {
    this.dataSource.data = this._proveedores();
  }

  get proveedores() {
    return this._proveedores();
  }

  getDataSource(): MatTableDataSource<Proveedores>{
    return this.dataSource
  }

  getProveedorName(id: number): string {
    const proveedor = this._proveedores().find(p => p.id === id);
    return proveedor ? proveedor.nombre : '';
  }
  
  update(proveedor: Proveedores){
    const proveedores = this._proveedores();
    const index = proveedores.findIndex(p => p.id === proveedor.id);
    if (index !== -1) {
      const updatedProveedor = [
        ...proveedores.slice(0, index),
        proveedor,
        ...proveedores.slice(index + 1)
      ];

      this._proveedores.set(updatedProveedor);

      this.updateDataSource();
    }
  }

  add(proveedor:Proveedores):void{
    const proveedores = this._proveedores();

    const maxId = Math.max(0,...proveedores.map(p => p.id || 0));
    const newProveedor= {
      ...proveedor,
      id: maxId + 1
    };

    this._proveedores.set([...proveedores, newProveedor]);

    this.updateDataSource
  }

  delete(id: number):void{
    const proveedores = this._proveedores();
    const updatedProveedores = proveedores.filter(p => p.id !== id);
  
    this._proveedores.set(updatedProveedores);
  
    this.updateDataSource();
  }
}   