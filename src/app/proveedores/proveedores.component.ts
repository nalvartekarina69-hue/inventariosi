import { Component, inject } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { DialogService } from '../services/dialog.service';
import { Proveedores } from '../proveedores';
import { BaseTableComponent } from '../components/base-table/base-table.component';
import { AgregarEditarProveedorComponent } from '../components/agregar-editar-proveedor/agregar-editar-proveedor.component';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-proveedores',
  imports: [BaseTableComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent {
  private proveedoresService = inject(ProveedoresService);
  private dialogService = inject(DialogService);
  private notificacionService = inject(NotificacionService);


  columnas: string[]=['id', 'nombre', 'razonSocial', 'telefono', 'direccion', 'correo'];
  dataSource = this.proveedoresService.getDataSource();

  
  openDialog(proveedor?: Proveedores){
    const dialogRef = this.dialogService.open(AgregarEditarProveedorComponent, {
          data: proveedor || {},
          width: '500px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
          if (result.id && proveedor){

            this.proveedoresService.update(result);
            this.notificacionService.showUpdated('Proveedor', result.nombre);
          }else{
            this.proveedoresService.add(result);
            this.notificacionService.showAdded('Proveedor', result.nombre);
          }
      }
    });
    }

    onDeleteItem(proveedor: Proveedores){
      this.notificacionService
      .confirmDelete('Proveedor', proveedor.nombre)
      .subscribe(confirmed => {
        if (confirmed){
          try{
          this.proveedoresService.delete(proveedor.id);
          this.notificacionService.showDeleted('Proveedor', proveedor.nombre);
          }catch(error){
            this.notificacionService.showError('Error al eliminar el proveedor')
          }
        }
      });
    }
}
      