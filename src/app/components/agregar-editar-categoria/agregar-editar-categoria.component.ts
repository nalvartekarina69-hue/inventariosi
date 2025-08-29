import { Component, inject } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categorias } from '../../categorias';

@Component({
  selector: 'app-agregar-editar-categoria',
  imports: [MatButtonModule, MatDialogModule,
    MatInputModule,ReactiveFormsModule],
  templateUrl: './agregar-editar-categoria.component.html',
  styleUrl: './agregar-editar-categoria.component.scss'
})
export class AgregarEditarCategoriaComponent {

  public data = inject(MAT_DIALOG_DATA) as Categorias;
  private dialogRef = inject(MatDialogRef<AgregarEditarCategoriaComponent>);
  private fb = inject(FormBuilder);
  private categoriasService = inject(CategoriasService);
  
  columnas: string[] = ['nombre', 'descripcion'];
  form: FormGroup;
  
  constructor() {
    this.form = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || '', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const result: Categorias = {
        id: this.data?.id || 0, // 0 para nuevas categorías
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
