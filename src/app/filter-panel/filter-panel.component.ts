import { Component, Input } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CustomerEvent, EventFilterGroup } from '../services/models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

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
  ],
})
export class FilterPanelComponent {
  @Input() events: CustomerEvent[] = [];

  eventGroups: EventFilterGroup[] = [];

  stringOps = ['equals', 'does not equal', 'contains', 'does not contain'];
  numberOps = ['equal to', 'in between', 'less than', 'greater than'];

  addEventGroup() {
    this.eventGroups.push({ id: uuidv4(), event: null, filters: [] });
  }

  removeEventGroup(id: string) {
    this.eventGroups = this.eventGroups.filter((g) => g.id !== id);
  }

  addFilter(group: EventFilterGroup) {
    group.filters.push({
      id: uuidv4(),
      property: null,
      operator: 'equals',
      value: '',
    });
  }

  removeFilter(group: EventFilterGroup, fid: string) {
    group.filters = group.filters.filter((f) => f.id !== fid);
  }

  onEventChange(group: EventFilterGroup, eventName: string) {
    group.event = eventName;
    group.filters = []; // reset filters for new event
  }

  getPropertiesForEvent(eventName: string) {
    return this.events.find((e) => e.name === eventName)?.properties ?? [];
  }

  getOperatorsForProperty(eventName: string, propName: string) {
    const prop = this.getPropertiesForEvent(eventName).find((p) => p.name === propName);
    console.log('PROPERTY:', prop);
    return prop?.type === 'number' ? this.numberOps : this.stringOps;
  }

  applyFilters() {
    console.log('APPLY FILTERS MODEL:', JSON.parse(JSON.stringify(this.eventGroups)));
  }
}
