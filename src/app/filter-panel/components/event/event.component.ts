import { Component, Input, OnChanges, WritableSignal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerEventDomain, FunnelStep } from '../../store/model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-event-component',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class EventComponent implements OnChanges {
  @Input() fetchedEvents!: CustomerEventDomain[];
  @Input() funnelSteps!: WritableSignal<FunnelStep[]>;
  @Input() selectedFunnelStep: FunnelStep | undefined;
  @Input() selectedEventIndex: number | undefined;

  protected eventFilterFormControl = new FormControl('');
  protected filteredEvents$!: Observable<CustomerEventDomain[]>;

  ngOnChanges(): void {
    this.filteredEvents$ = this.eventFilterFormControl.valueChanges.pipe(
      startWith(''),
      map((search) =>
        this.fetchedEvents.filter((e) =>
          e.name.toLowerCase().includes((search || '').toLowerCase())
        )
      )
    );
  }

  protected onEventChange(group: FunnelStep, selectedEventName: string) {
    this.funnelSteps.update((steps) =>
      steps.map((step) =>
        step.id === group.id ? { ...step, name: selectedEventName, eventAttributes: [] } : step
      )
    );
  }

  protected copyEvent(index: number) {
    this.funnelSteps.update((steps) => {
      const eventGroup = steps.find((step) => step.id === this.selectedFunnelStep?.id);
      const copiedGroup = { ...eventGroup, id: uuidv4() };
      return [...steps.slice(0, index + 1), copiedGroup, ...steps.slice(index + 1)];
    });
  }

  protected removeEventGroup(id: string) {
    this.funnelSteps.update((steps) => steps.filter((step) => step.id !== id));
  }
}
