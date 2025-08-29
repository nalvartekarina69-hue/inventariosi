import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ProveedoresService } from '../../services/proveedores.service';
import { Proveedores } from '../../proveedores';

@Component({
  selector: 'app-agregar-editar-proveedor',
  imports: [ MatButtonModule, MatDialogModule,
    MatInputModule,ReactiveFormsModule],
  templateUrl: './agregar-editar-proveedor.component.html',
  styleUrl: './agregar-editar-proveedor.component.scss'
})
export class AgregarEditarProveedorComponent {

  public data = inject(MAT_DIALOG_DATA) as Proveedores
  private dialogRef = inject(MatDialogRef<AgregarEditarProveedorComponent>);
  private fb = inject(FormBuilder);
  private proveedoresService = inject(ProveedoresService);
  
  columnas: string[]=['nombre', 'razonSocial', 'direccion','telefono','correo']
  form: FormGroup;

  constructor(){
    this.form = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      razonSocial: [this.data?.razonSocial || '', Validators.required],
      direccion: [this.data?.direccion || '', Validators.required],
      telefono: [this.data?.telefono || '', Validators.required],
      correo: [this.data?.correo || '', Validators.required],
    });
  }
  
  onSubmit():void{
    if(this.form.valid){
      const formData = this.form.value;
      const result: Proveedores = {
        id: this.data?.id || 0,
        ...formData
      };

      this.dialogRef.close(result);
      }else{
        Object.keys(this.form.controls).forEach( key =>{
          this.form.get(key)?.markAsTouched();
        });
      }
    }
}   
