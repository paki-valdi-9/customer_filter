import { Component, Input, signal } from '@angular/core';
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
  ],
})
export class FilterPanelComponent {
  @Input() fetchedEvents: CustomerEventDomain[] = [];

  protected funnelSteps = signal<FunnelStep[]>([{ id: uuidv4(), name: null, eventAttributes: [] }]);

  protected addFunnelStep() {
    this.funnelSteps.update((groups) => [
      ...groups,
      { id: uuidv4(), name: null, eventAttributes: [] },
    ]);
  }

  protected discardAllFunnelSteps() {
    this.funnelSteps.set([{ id: uuidv4(), name: null, eventAttributes: [] }]);
  }

  protected addEventAttribute(newGroup: FunnelStep) {
    this.funnelSteps.update((groups) =>
      groups.map((group) =>
        group.id === newGroup.id
          ? {
              ...group,
              eventAttributes: [
                ...group.eventAttributes,
                {
                  id: uuidv4(),
                  name: null,
                  operator: 'equals',
                  value: null,
                },
              ],
            }
          : group
      )
    );
  }

  protected removeEventAttribute(group: FunnelStep, propertyId: string) {
    group.eventAttributes = group.eventAttributes.filter((p) => p.id !== propertyId);
  }

  protected getPropertiesOfEvent(selectedEventName: string): PropertyDomain[] {
    return this.fetchedEvents.find((event) => event.name === selectedEventName)?.properties ?? [];
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
