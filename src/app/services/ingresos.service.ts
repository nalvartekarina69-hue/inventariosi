import { Injectable, signal } from '@angular/core';
import { Ingresos } from '../ingresos';
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
  constructor() { }
}
