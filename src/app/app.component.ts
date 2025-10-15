import { Component, inject } from '@angular/core';
import { FilterPanelComponent } from './filter-panel/filter-panel.component';
import { EventService } from './services/event-filters';
import { CustomerEventDomain } from './filter-panel/store/model';

@Component({
  selector: 'app-root',
  imports: [FilterPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly service = inject(EventService);

  protected fetchedEvents: CustomerEventDomain[] = [];

  ngOnInit() {
    this.service.toDomainEvents().subscribe((res) => (this.fetchedEvents = res));
  }
}
