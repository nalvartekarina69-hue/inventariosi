import { Component, inject } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { DialogService } from '../services/dialog.service';
import { Proveedores } from '../proveedores';
import { BaseTableComponent } from '../components/base-table/base-table.component';
import { AgregarComponent } from '../agregar/agregar.component';

@Component({
  selector: 'app-proveedores',
  imports: [BaseTableComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {
  private proveedoresService = inject(ProveedoresService);
  private dialogService = inject(DialogService);

  columnas: string[]=['id', 'nombre', 'razonSocial', 'telefono', 'direccion', 'correo'];
  dataSource = this.proveedoresService.getDataSource();

  
  openDialog(proveedor?: Proveedores){
    this.dialogService.open(AgregarComponent ,{data:proveedor || {}})
  }
}
