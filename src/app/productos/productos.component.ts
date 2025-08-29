import { Component, inject } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Productos } from '../productos';
import { DialogService } from '../services/dialog.service';
import { BaseTableComponent } from '../components/base-table/base-table.component';
import { CategoriasService } from '../services/categorias.service';
import { AgregarEditarProductoComponent } from '../components/agregar-editar-producto/agregar-editar-producto.component';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-productos',
  imports: [BaseTableComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  
  private productosService = inject(ProductosService);
  private categoriasService = inject(CategoriasService);
  private dialogService = inject(DialogService);

  private notificacionService = inject(NotificacionService);

  columnas: string[]=['id', 'nombre', 'codigo', 'stock', 'precioCompra', 'precioVenta', 'categoriaId'];
  dataSource = this.productosService.getDataSource();

  valueFunctions = {
    categoriaId: (item: Productos) => this.categoriasService.getCategoryName(item.categoriaId)
  };

  openDialog(producto?: Productos) {
    const dialogRef = this.dialogService.open(AgregarEditarProductoComponent, {
          data: producto || {},
          width: '500px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle form submission
        if (result.id) {
          // Update existing product
          this.productosService.update(result);
          this.notificacionService.showUpdated('Producto', result.nombre);
        } else {
          // Add new product
          this.productosService.add(result);
          this.notificacionService.showAdded('Producto', result.nombre);
        }        
        
      }
    });
  }
  onDeleteItem(producto: Productos) {
        // Mostrar confirmación de eliminación (botones Aceptar y Cancelar)
        this.notificacionService
          .confirmDelete('Producto', producto.nombre)
          .subscribe(confirmed => {
            if (confirmed) {
              try {
                this.productosService.delete(producto.id!);
                // Mostrar notificación de eliminación exitosa
                this.notificacionService.showDeleted('producto', producto.nombre);
              } catch (error) {
                this.notificacionService.showError('Error al eliminar la producto');
              }
            }
          });
      }
}
