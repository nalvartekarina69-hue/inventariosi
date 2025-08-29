import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  constructor() { }

  open<T, D = any, R = any >(
    template: ComponentType<T> | TemplateRef<T>,
    config: MatDialogConfig<D>
  ): MatDialogRef<T,R>{
    return this.dialog.open(template, config);
  }
}
