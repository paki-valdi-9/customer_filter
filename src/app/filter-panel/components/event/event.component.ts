import { Component, Input } from '@angular/core';
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
  @Input() eventGroups: EventFilterGroup[] = [{ id: uuidv4(), event: null, properties: [] }];
  @Input() selectedEvent: EventFilterGroup | undefined;
  @Input() selectedEventIndex: number | undefined;

  onEventChange(group: EventFilterGroup, eventName: string) {
    group.event = eventName;
    group.properties = [];
  }

  copyEvent(index: number) {
    const eventGroup = this.eventGroups[index];
    const copiedGroup = JSON.parse(JSON.stringify(eventGroup));
    copiedGroup.id = uuidv4();
    this.eventGroups.splice(index + 1, 0, copiedGroup);
  }

  removeEventGroup(id: string) {
    this.eventGroups = this.eventGroups.filter((g) => g.id !== id);
  }
}
