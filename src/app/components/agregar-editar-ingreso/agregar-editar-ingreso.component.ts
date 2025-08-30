import { Component, inject } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorias } from '../../categorias';
import { Productos } from '../../productos';
import { MatSelectModule } from '@angular/material/select';
import { ProductosService } from '../../services/productos.service';
import { Ingresos } from '../../ingresos';
import { Proveedores } from '../../proveedores';
import { ProveedoresService } from '../../services/proveedores.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

interface DialogData extends Ingresos {
  tipo?: 'ingresos' | 'salidas';
}

@Component({
  selector: 'app-agregar-editar-ingreso',
  imports: [MatButtonModule, MatDialogModule,
    MatInputModule, ReactiveFormsModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './agregar-editar-ingreso.component.html',
  styleUrl: './agregar-editar-ingreso.component.scss'
})
export class AgregarEditarIngresoComponent {
  public data = inject(MAT_DIALOG_DATA) as DialogData;
  private dialogRef = inject(MatDialogRef<AgregarEditarIngresoComponent>);
  private fb = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);
  private productosService = inject(ProductosService);
  private proveedoresService = inject(ProveedoresService);
  
  columnas: string[] = ['productoId', 'proveedorId','cantidad','precioCompra', 'precioVenta', 'categoriaId','fecha'];
  form: FormGroup;
  
  // Propiedades para determinar el tipo
  tipoOperacion: 'ingresos' | 'salidas' = 'ingresos';
  tituloDialog: string = '';

  categorias: Categorias[] = [];
  productos: Productos[] = [];
  proveedores: Proveedores[] = [];
  
  constructor() {
    this.tipoOperacion = this.data?.tipo || 'ingresos';
    this.tituloDialog = this.tipoOperacion === 'salidas' ? 'Salida' : 'Ingreso';
    
    this.categorias = this.categoriasService.categorias;
    this.productos = this.productosService.productos;
    this.proveedores = this.proveedoresService.proveedores;

    this.form = this.fb.group({
      productoId: [this.data?.productoId || '', Validators.required],
      proveedorId: [this.data?.proveedorId || '', Validators.required],
      cantidad: [this.data?.cantidad || '', Validators.required],
      precioCompra: [this.data?.precioCompra || '', Validators.required],
      precioVenta: [this.data?.precioVenta || '', Validators.required],
      categoriaId: [this.data?.categoriaId || '', Validators.required],
      fecha: [this.data?.fecha || '', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const result: Ingresos = {
        id: this.data?.id || 0, // 0 para nuevos registros
        ...formData
      };
      
      this.dialogRef.close(result);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}