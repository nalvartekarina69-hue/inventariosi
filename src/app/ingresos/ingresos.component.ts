import { Component,inject } from '@angular/core';
import { BaseTableComponent } from '../components/base-table/base-table.component';
import { ProductosService } from '../services/productos.service';
import { DialogService } from '../services/dialog.service';
import { CategoriasService } from '../services/categorias.service';
import { NotificacionService } from '../services/notificacion.service';
import { IngresosService } from '../services/ingresos.service';
import { Ingresos } from '../ingresos';
import { ProveedoresService } from '../services/proveedores.service';
import { AgregarEditarIngresoComponent } from '../components/agregar-editar-ingreso/agregar-editar-ingreso.component';

@Component({
  selector: 'app-ingresos',
  imports: [BaseTableComponent],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.scss'
})
export class IngresosComponent {
  private ingresosService = inject(IngresosService);
  private categoriasService = inject(CategoriasService);
  private productosService = inject(ProductosService);
  private proveedorService = inject(ProveedoresService);
  private dialogService = inject(DialogService);
  private notificacionService = inject(NotificacionService);

  columnas: string[]=['productoId', 'proveedorId','cantidad','precioCompra', 'precioVenta', 'categoriaId','fecha'];
  dataSource = this.ingresosService.getDataSource();

  valueFunctions = {
    categoriaId: (item: Ingresos) => this.categoriasService.getCategoryName(item.categoriaId),
    productoId: (item: Ingresos) => this.productosService.getProductoName(item.productoId),
    proveedorId: (item: Ingresos) => this.proveedorService.getProveedorName(item.proveedorId)
  };

  openDialog(ingreso?: Ingresos) {
    const dialogRef = this.dialogService.open(AgregarEditarIngresoComponent, {
          data: ingreso || {},
          width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle form submission
        if (result.id && ingreso) {
          // Update existing record
          this.ingresosService.update(result);
          this.notificacionService.showUpdated('Producto', result.nombre);
        } else {
          // Add new 
          this.ingresosService.add(result);
          this.notificacionService.showAdded('Producto', result.nombre);
        }        
        
      }
    });
  }

  onDeleteItem(ingreso: Ingresos) {
    // Mostrar confirmación de eliminación (botones Aceptar y Cancelar)
    this.notificacionService
      .confirmDelete('Ingreso', '')
      .subscribe(confirmed => {
        if (confirmed) {
          try {
            this.ingresosService.delete(ingreso.id!);
            // Mostrar notificación de eliminación exitosa
            this.notificacionService.showDeleted('Ingreso', '');
          } catch (error) {
            this.notificacionService.showError('Error al eliminar la ingreso');
          }
        }
      });
  }
}
