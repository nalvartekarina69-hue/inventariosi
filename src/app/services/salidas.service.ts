import { Injectable, signal } from '@angular/core';
import { Ingresos } from '../ingresos';

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
  constructor() { }
}
