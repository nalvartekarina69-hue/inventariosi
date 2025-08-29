import { Injectable, inject } from '@angular/core';
import { NotificacionComponent, NotificacionData,DialogStyle,DialogType } from '../components/notificacion/notificacion.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private dialog = inject(MatDialog);

  // Método principal para abrir diálogos
  private openDialog(data: NotificacionData): Observable<boolean> {
    const dialogRef = this.dialog.open(NotificacionComponent, {
      width: '400px',
      data,
      disableClose: data.type === 'confirmation', // Solo las confirmaciones no se pueden cerrar con ESC
      panelClass: `unified-dialog-${data.style}`
    });

    return dialogRef.afterClosed();
  }

  // ===== MÉTODOS PARA NOTIFICACIONES (Solo botón Aceptar) =====
  
  showNotification(title: string, message: string, style: DialogStyle = 'info'): Observable<boolean> {
    return this.openDialog({
      type: 'notification',
      style,
      title,
      message,
      confirmText: 'Aceptar'
    });
  }

  // Notificaciones específicas para operaciones CRUD
  showAdded(entity: string, entityName?: string): Observable<boolean> {
    const message = entityName 
      ? `${entity} "${entityName}" ha sido agregado correctamente`
      : `${entity} agregado correctamente`;
    
    return this.showNotification('¡Agregado!', message, 'success');
  }

  showUpdated(entity: string, entityName?: string): Observable<boolean> {
    const message = entityName 
      ? `${entity} "${entityName}" ha sido actualizado correctamente`
      : `${entity} actualizado correctamente`;
    
    return this.showNotification('¡Actualizado!', message, 'success');
  }

  showDeleted(entity: string, entityName?: string): Observable<boolean> {
    const message = entityName 
      ? `${entity} "${entityName}" ha sido eliminado correctamente`
      : `${entity} eliminado correctamente`;
    
    return this.showNotification('¡Eliminado!', message, 'success');
  }

  showError(message: string): Observable<boolean> {
    return this.showNotification('Error', message, 'error');
  }

  showWarning(message: string): Observable<boolean> {
    return this.showNotification('Advertencia', message, 'warning');
  }

  showInfo(message: string): Observable<boolean> {
    return this.showNotification('Información', message, 'info');
  }

  // ===== MÉTODOS PARA CONFIRMACIONES (Botones Aceptar y Cancelar) =====
  
  showConfirmation(title: string, message: string, style: DialogStyle = 'info'): Observable<boolean> {
    return this.openDialog({
      type: 'confirmation',
      style,
      title,
      message,
      confirmText: 'Aceptar',
      cancelText: 'Cancelar'
    });
  }

  // Confirmación específica para eliminar
  confirmDelete(entity: string , entityName?: string): Observable<boolean> {
    const message = entityName 
      ? `¿Estás seguro de que deseas eliminar ${entity.toLowerCase()} "${entityName}"?`
      : `¿Estás seguro de que deseas eliminar este ${entity.toLowerCase()}?`;
    
    return this.openDialog({
      type: 'confirmation',
      style: 'danger',
      title: `Eliminar ${entity}`,
      message: `${message}\n\nEsta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    });
  }

  // Confirmación genérica con estilos personalizados
  confirmAction(title: string, message: string, confirmText: string = 'Aceptar', cancelText: string = 'Cancelar', style: DialogStyle = 'warning'): Observable<boolean> {
    return this.openDialog({
      type: 'confirmation',
      style,
      title,
      message,
      confirmText,
      cancelText
    });
  }
}