import { Component, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MenuComponent } from "./components/menu/menu.component";
import { MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MenuComponent,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  collapsed = signal(false);

  sideNavWidth = computed(() => {
    return this.collapsed() ? '60px' : '200px';
  });

  contentMargin = computed(
    () => {
      return this.collapsed()? '10px 20px auto 80px' : '10px 20px auto 220px' ;
    }
  );
  contentWidth = computed(
    () => {
      return this.collapsed()? 'calc(100% - 100px)': 'calc(100% - 240px)'
    }
  )
  onCollapsedChange(collapsedSignal: Signal<boolean>) {
    // Update our local collapsed signal with the value from navbar
    this.collapsed.set(collapsedSignal());
  }
}
