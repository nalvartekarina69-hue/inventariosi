import { Component, EventEmitter, Output, Signal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  collapsed = signal(false);
  
  @Output() collapsedChange = new EventEmitter<Signal<boolean>>();

  constructor() {
    // Emit the signal initially
    this.collapsedChange.emit(this.collapsed);
  }

  toggleCollapsed() {
    this.collapsed.set(!this.collapsed());
    this.collapsedChange.emit(this.collapsed);
  }
}
