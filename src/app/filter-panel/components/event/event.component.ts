import { Component, Input, WritableSignal } from '@angular/core';
import { CustomerEvent, EventFilterGroup } from '../../../services/models';
import { v4 as uuidv4 } from 'uuid';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-event-component',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule, MatIconModule],
})
export class EventComponent {
  @Input() events: CustomerEvent[] = [];
  @Input() eventGroups!: WritableSignal<EventFilterGroup[]>;
  @Input() selectedEvent: EventFilterGroup | undefined;
  @Input() selectedEventIndex: number | undefined;

  onEventChange(group: EventFilterGroup, eventName: string) {
    this.eventGroups.update((groups) =>
      groups.map((g) => (g.id === group.id ? { ...g, event: eventName, properties: [] } : g))
    );
  }

  copyEvent(index: number) {
    this.eventGroups.update((groups) => {
      const eventGroup = groups[index];
      const copiedGroup = { ...eventGroup, id: uuidv4() };
      return [...groups.slice(0, index + 1), copiedGroup, ...groups.slice(index + 1)];
    });
  }

  removeEventGroup(id: string) {
    this.eventGroups.update((groups) => groups.filter((g) => g.id !== id));
  }
}
