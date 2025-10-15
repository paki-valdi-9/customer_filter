import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { EventComponent } from './components/event/event.component';
import { CustomerEventDomain, FunnelStep, PropertyDomain } from './store/model';
import { NUMBER_OPS_CONST, STRING_OPS_CONST } from '../shared/store/constants';
import { PropertyComponent } from './components/property/property.component';
import { OperatorComponent } from './components/operator/operator.component';
import { EventService } from '../services/event-filters';
import { Subject, takeUntil } from 'rxjs';
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
    PropertyComponent,
    OperatorComponent,
  ],
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  private readonly service = inject(EventService);
  private readonly onDestroy$ = new Subject<void>();

  protected fetchedEvents = signal<CustomerEventDomain[]>([]);
  protected funnelSteps = signal<FunnelStep[]>([{ id: uuidv4(), name: null, eventAttributes: [] }]);

  ngOnInit(): void {
    this.service
      .toDomainEvents()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((events) => this.fetchedEvents.set(events));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  protected addFunnelStep() {
    this.funnelSteps.update((steps) => [
      ...steps,
      { id: uuidv4(), name: null, eventAttributes: [] },
    ]);
  }

  protected discardAllFunnelSteps() {
    this.funnelSteps.set([{ id: uuidv4(), name: null, eventAttributes: [] }]);
  }

  protected addEventAttribute(newStep: FunnelStep) {
    this.funnelSteps.update((steps) =>
      steps.map((step) =>
        step.id === newStep.id
          ? {
              ...step,
              eventAttributes: [
                ...step.eventAttributes,
                {
                  id: uuidv4(),
                  name: null,
                  operator: undefined,
                  value: undefined,
                },
              ],
            }
          : step
      )
    );
  }

  protected removeEventAttribute(step: FunnelStep, propertyId: string) {
    step.eventAttributes = step.eventAttributes.filter((p) => p.id !== propertyId);
  }

  protected getPropertiesOfEvent(selectedEventName: string): PropertyDomain[] {
    return this.fetchedEvents().find((event) => event.name === selectedEventName)?.properties ?? [];
  }

  protected getOperatorsOfProperty(selectedEventName: string, selectedPropName: string) {
    const selectedProperty = this.getPropertiesOfEvent(selectedEventName).find(
      (property) => property.name === selectedPropName
    );
    return selectedProperty?.type === 'number' ? NUMBER_OPS_CONST : STRING_OPS_CONST;
  }

  protected applyFilters() {
    console.log('APPLY FILTERS MODEL:', JSON.parse(JSON.stringify(this.funnelSteps())));
  }
}
