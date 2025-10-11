import { Component, inject } from '@angular/core';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { CustomerEvent } from './services/models';
import { EventService } from './services/event-filters';

@Component({
  selector: 'app-root',
  imports: [FilterPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly service = inject(EventService);

  events: CustomerEvent[] = [];

  ngOnInit() {
    this.service.getEvents().subscribe((res) => (this.events = res));
  }
}
