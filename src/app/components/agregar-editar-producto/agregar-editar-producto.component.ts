import { Component, inject } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorias } from '../../categorias';
import { Productos } from '../../productos';
@Component({
  selector: 'app-agregar-editar-producto',
  imports: [MatButtonModule, MatDialogModule,
    MatInputModule,ReactiveFormsModule],
  templateUrl: './agregar-editar-producto.component.html',
  styleUrl: './agregar-editar-producto.component.scss'
})
export class AgregarEditarProductoComponent {
public data = inject(MAT_DIALOG_DATA) as Productos;
  private dialogRef = inject(MatDialogRef<AgregarEditarProductoComponent>);
  private fb = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);
  
  columnas: string[] = ['nombre', 'codigo','precioVenta','precioCompra', 'stock','categoriaId'];
  form: FormGroup;
  
  constructor() {
    this.form = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      codigo: [this.data?.codigo || '', Validators.required],
      precioVenta: [this.data?.precioVenta || '', Validators.required],
      precioCompra: [this.data?.precioCompra || '', Validators.required],
      stock: [this.data?.stock || '', Validators.required],
      categoriaId: [this.data?.categoriaId || '', Validators.required]

    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const result: Productos = {
        id: this.data?.id || 0, // 0 para nuevos productos
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

