import { Component, Input, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CustomerEvent, EventFilterGroup } from '../services/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { EventComponent } from './components/event/event.component';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    MatDividerModule,
    EventComponent,
  ],
})
export class FilterPanelComponent {
  @Input() events: CustomerEvent[] = [];

  eventGroups = signal<EventFilterGroup[]>([{ id: uuidv4(), event: null, properties: [] }]);
  stringOps = ['equals', 'does not equal', 'contains', 'does not contain'];
  numberOps = ['equal to', 'in between', 'less than', 'greater than'];

  addEventGroup() {
    this.eventGroups.update((groups) => [...groups, { id: uuidv4(), event: null, properties: [] }]);
  }

  discardEvents() {
    this.eventGroups.set([{ id: uuidv4(), event: null, properties: [] }]);
  }

  addFilter(group: EventFilterGroup) {
    this.eventGroups.update((groups) =>
      groups.map((g) =>
        g.id === group.id
          ? {
              ...g,
              properties: [
                ...g.properties,
                {
                  id: uuidv4(),
                  property: null,
                  operator: 'equals',
                  value: '',
                },
              ],
            }
          : g
      )
    );
  }

  removeFilter(group: EventFilterGroup, propertyId: string) {
    group.properties = group.properties.filter((p) => p.id !== propertyId);
  }

  getPropertiesForEvent(eventName: string) {
    return this.events.find((e) => e.name === eventName)?.properties ?? [];
  }

  getOperatorsForProperty(eventName: string, propName: string) {
    const prop = this.getPropertiesForEvent(eventName).find((p) => p.name === propName);
    return prop?.type === 'number' ? this.numberOps : this.stringOps;
  }

  applyFilters() {
    console.log('APPLY FILTERS MODEL:', JSON.parse(JSON.stringify(this.eventGroups())));
  }
}
