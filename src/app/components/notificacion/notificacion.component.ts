import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type DialogStyle = 'success' | 'error' | 'warning' | 'info' | 'danger';
export type DialogType = 'notification' | 'confirmation';

export interface NotificacionData {
  type: DialogType; // 'notification' o 'confirmation'
  style: DialogStyle; // 'success', 'error', 'warning', 'info', 'danger'
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  entity?: string; // Para personalizar mensajes como "Categoría agregada"
  entityName?: string; // Nombre específico del elemento
}

@Component({
  selector: 'app-notificacion',
  imports: [MatIconModule, MatButtonModule, CommonModule, MatDialogModule],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.scss'
})
export class NotificacionComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificacionData  ) {
    // Valores por defecto
    this.data = {
      confirmText: 'Aceptar',
      cancelText: 'Cancelar',
      ...data
    };
  }

  getIcon(): string {
    switch (this.data.style) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'danger':
        return 'dangerous';
      default:
        return 'info';
    }
  }

  getButtonColor(): string {
    switch (this.data.style) {
      case 'success':
        return 'primary';
      case 'error':
      case 'danger':
        return 'warn';
      case 'warning':
        return 'accent';
      case 'info':
      default:
        return 'primary';
    }
  }

  onAccept(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}