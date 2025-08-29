import { Component, inject } from '@angular/core';
import { BaseTableComponent } from '../components/base-table/base-table.component';
import { CategoriasService } from '../services/categorias.service';
import { DialogService } from '../services/dialog.service';
import { NotificacionService } from '../services/notificacion.service';
import { Categorias } from '../categorias';
import { AgregarEditarCategoriaComponent } from '../components/agregar-editar-categoria/agregar-editar-categoria.component';

@Component({
  selector: 'app-categorias',
  imports: [BaseTableComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
  
  private categoriasService = inject(CategoriasService);
  private dialogService = inject(DialogService);
  private notificacionService = inject(NotificacionService);

  columnas: string[]=['id', 'nombre', 'descripcion'];
  dataSource = this.categoriasService.getDataSource();  

  openDialog(categoria?: Categorias) {
    const dialogRef = this.dialogService.open(AgregarEditarCategoriaComponent, {
      data: categoria || {},
      width: '500px'
    });
      
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id && categoria) {
          // Update existing category
          this.categoriasService.update(result);
          this.notificacionService.showUpdated('Categoría', result.nombre);
        } else {
          // Add new category  
          this.categoriasService.add(result);
          this.notificacionService.showAdded('Categoría', result.nombre);
        }
        
      }
      });
    }
    
    onDeleteItem(categoria: Categorias) {
      // Mostrar confirmación de eliminación (botones Aceptar y Cancelar)
      this.notificacionService
        .confirmDelete('Categoría', categoria.nombre)
        .subscribe(confirmed => {
          if (confirmed) {
            try {
              this.categoriasService.delete(categoria.id!);
              // Mostrar notificación de eliminación exitosa
              this.notificacionService.showDeleted('Categoría', categoria.nombre);
            } catch (error) {
              this.notificacionService.showError('Error al eliminar la categoría');
            }
          }
        });
    }
}
