import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableComponent } from '../components/base-table/base-table.component';
import { ProductosService } from '../services/productos.service';
import { DialogService } from '../services/dialog.service';
import { CategoriasService } from '../services/categorias.service';
import { NotificacionService } from '../services/notificacion.service';
import { IngresosService } from '../services/ingresos.service';
import { SalidasService } from '../services/salidas.service';
import { Ingresos } from '../ingresos';
import { ProveedoresService } from '../services/proveedores.service';
import { AgregarEditarIngresoComponent } from '../components/agregar-editar-ingreso/agregar-editar-ingreso.component';

@Component({
  selector: 'app-ingresos',
  imports: [BaseTableComponent],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.scss'
})
export class IngresosComponent implements OnInit {
  private ingresosService = inject(IngresosService);
  private salidasService = inject(SalidasService);
  private categoriasService = inject(CategoriasService);
  private productosService = inject(ProductosService);
  private proveedorService = inject(ProveedoresService);
  private dialogService = inject(DialogService);
  private notificacionService = inject(NotificacionService);
  private route = inject(ActivatedRoute);

  // Propiedades que cambiarán según el tipo
  titulo: string = '';
  columnas: string[] = ['productoId', 'proveedorId','cantidad','precioCompra', 'precioVenta', 'categoriaId','fecha'];
  dataSource: any;
  tipoOperacion: 'ingresos' | 'salidas' = 'ingresos';

  valueFunctions = {
    categoriaId: (item: Ingresos) => this.categoriasService.getCategoryName(item.categoriaId),
    productoId: (item: Ingresos) => this.productosService.getProductoName(item.productoId),
    proveedorId: (item: Ingresos) => this.proveedorService.getProveedorName(item.proveedorId)
  };

  ngOnInit() {
    // Obtener el tipo de operación desde la ruta
    this.tipoOperacion = this.route.snapshot.data['tipo'] || 'ingresos';
    
    // Configurar según el tipo
    this.configurarComponente();
  }

  private configurarComponente() {
    if (this.tipoOperacion === 'salidas') {
      this.titulo = 'salidas';
      this.dataSource = this.salidasService.getDataSource();
    } else {
      this.titulo = 'ingresos';
      this.dataSource = this.ingresosService.getDataSource();
    }
  }

  openDialog(item?: Ingresos) {
    const dialogRef = this.dialogService.open(AgregarEditarIngresoComponent, {
      data: item ? 
        { ...item, tipo: this.tipoOperacion } : 
        { tipo: this.tipoOperacion },
      width: '600px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle form submission
        if (result.id && item) {
          // Update existing record
          this.getService().update(result);
          this.notificacionService.showUpdated('Registro', '');
        } else {
          // Add new 
          this.getService().add(result);
          this.notificacionService.showAdded('Registro', '');
        }        
      }
    });
  }

  onDeleteItem(item: Ingresos) {
    const tipo = this.tipoOperacion === 'ingresos' ? 'Ingreso' : 'Salida';
    
    this.notificacionService
      .confirmDelete(tipo, '')
      .subscribe(confirmed => {
        if (confirmed) {
          try {
            this.getService().delete(item.id!);
            this.notificacionService.showDeleted(tipo, '');
          } catch (error) {
            this.notificacionService.showError(`Error al eliminar el ${tipo.toLowerCase()}`);
          }
        }
      });
  }

  private getService() {
    return this.tipoOperacion === 'salidas' ? this.salidasService : this.ingresosService;
  }
}