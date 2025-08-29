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

  get proveedores() {
    return this._proveedores();
  }

  getDataSource(): MatTableDataSource<Proveedores>{
    return new MatTableDataSource( this.proveedores); 
  }
  
  constructor() { }
}
