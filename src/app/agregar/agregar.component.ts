import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule, 
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.scss'
})
export class AgregarComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AgregarComponent>);
  public data = inject(MAT_DIALOG_DATA);
  
  public form!: FormGroup;
  public columnas: string[] = [];
  
  ngOnInit() {
    this.initializeForm();
  }
  
  private initializeForm() {
    this.form = new FormGroup({});
    
    // Extract column names from data object
    if (this.data) {
      this.columnas = Object.keys(this.data).filter(key => key !== 'id');
      
      // Create form controls for each column
      this.columnas.forEach(column => {
        this.form.addControl(column, new FormControl(
          this.data[column], 
          Validators.required
        ));
      });
    }

  }
  
  public onSubmit() {
    if (this.form.valid) {
      const formData = {...this.data, ...this.form.value};
      this.dialogRef.close(formData);
    } else {
      this.form.markAllAsTouched();
    }
  }
  
}
