import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

export type MenuItem = {
  icon: string,
  label: string,
  route: string
}

@Component({
  selector: 'app-menu',
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  sideNavCollapsed= signal(false);

  @Input() set collapsed (val: boolean){
    this.sideNavCollapsed.set(val)
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashbooard',
      route: 'dashboard'
    },
    {
      icon: 'assignment',
      label: 'Productos',
      route: 'productos'
    },
    {
      icon: 'dns',
      label: 'Categorias',
      route: 'categorias'
    },
    {
      icon: 'assignment_ind',
      label: 'Proveedores',
      route: 'proveedores'
    },
    {
      icon: 'input',
      label: 'Ingresos',
      route: 'ingresos'
    },
    {
      icon: 'launch',
      label: 'Salidas',
      route: 'salidas'
    }
  ]);
}
