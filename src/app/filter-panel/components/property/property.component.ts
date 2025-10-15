import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventAttribute, PropertyDomain } from '../../store/model';
import { NUMBER_OPS_CONST, STRING_OPS_CONST } from '../../../shared/store/constants';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-property-component',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class PropertyComponent {
  @Input() selectedAttribute: EventAttribute | undefined;
  @Input() selectedAttributeProperties: PropertyDomain[] = [];

  protected propertyFilterFormControl = new FormControl('');
  protected filteredProperties$!: Observable<PropertyDomain[]>;

  ngOnInit(): void {
    this.filteredProperties$ = this.propertyFilterFormControl.valueChanges.pipe(
      startWith(''),
      map((search) =>
        (this.selectedAttributeProperties || []).filter((property) =>
          property.name.toLowerCase().includes((search || '').toLowerCase())
        )
      )
    );
  }

  protected onAttributeNameChange(editedAttribute: EventAttribute, newAttributeName: string) {
    editedAttribute.name = newAttributeName;

    const properties = this.selectedAttributeProperties;
    const selectedProperty = properties
      ? properties.find((property: any) => property.name === newAttributeName)
      : undefined;

    editedAttribute.operator =
      selectedProperty?.type === 'number' ? NUMBER_OPS_CONST[0] : STRING_OPS_CONST[0];

    if (selectedProperty?.type === 'number') {
      editedAttribute.value = editedAttribute.valueFrom = null;
    } else {
      editedAttribute.value = null;
      editedAttribute.valueFrom = undefined;
    }
  }
}
