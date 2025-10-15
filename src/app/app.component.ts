import { Component } from '@angular/core';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';

@Component({
  selector: 'app-root',
  imports: [FilterPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
