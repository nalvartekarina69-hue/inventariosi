import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-base-table',
  imports: [MatTableModule, MatCardModule, MatFormFieldModule, 
    MatIconModule, MatPaginatorModule, MatInputModule, MatButtonModule],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss'
})
export class BaseTableComponent<T> {
  @Input() titulo: string = '';
  @Input() columnas: string[] = [];
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource;
  @Input() getValueFunctions: Record<string, (item:T) => string> = {};
  @Output() addItem = new EventEmitter<void>();
  @Output() editItem = new EventEmitter<T>();
  @Output() deleteItem = new EventEmitter<T>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    // Conectar el paginador al dataSource
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  get displayedColumns(): string[] {
    return [...this.columnas, 'opciones'];
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
  
 }
