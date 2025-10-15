import { Component, Input, WritableSignal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerEventDomain, FunnelStep } from '../../store/model';

@Component({
  selector: 'app-event-component',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule, MatIconModule],
})
export class EventComponent {
  @Input() fetchedEvents: CustomerEventDomain[] = [];
  @Input() funnelSteps!: WritableSignal<FunnelStep[]>;
  @Input() selectedFunnelStep: FunnelStep | undefined;
  @Input() selectedEventIndex: number | undefined;

  onEventChange(group: FunnelStep, selectedEventName: string) {
    this.funnelSteps.update((steps) =>
      steps.map((step) =>
        step.id === group.id ? { ...step, name: selectedEventName, eventAttributes: [] } : step
      )
    );
  }

  copyEvent(index: number) {
    this.funnelSteps.update((steps) => {
      const eventGroup = steps.find((step) => step.id === this.selectedFunnelStep?.id);
      const copiedGroup = { ...eventGroup, id: uuidv4() };
      return [...steps.slice(0, index + 1), copiedGroup, ...steps.slice(index + 1)];
    });
  }

  removeEventGroup(id: string) {
    this.funnelSteps.update((steps) => steps.filter((step) => step.id !== id));
  }
}
