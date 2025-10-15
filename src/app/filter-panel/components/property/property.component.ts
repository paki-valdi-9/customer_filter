import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventAttribute, PropertyDomain } from '../../store/model';
import { NUMBER_OPS_CONST, STRING_OPS_CONST } from '../../../shared/store/constants';

@Component({
  selector: 'app-property-component',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule],
})
export class PropertyComponent {
  @Input() selectedAttribute: EventAttribute | undefined;
  @Input() selectedAttributeProperties: PropertyDomain[] = [];

  protected onAttributeNameChange(editedAttribute: EventAttribute, newAttributeName: string) {
    editedAttribute.name = newAttributeName;

    const properties = this.selectedAttributeProperties;
    const selectedProperty = properties
      ? properties.find((p: any) => p.name === newAttributeName)
      : undefined;

    editedAttribute.operator =
      selectedProperty?.type === 'number' ? NUMBER_OPS_CONST[0] : STRING_OPS_CONST[0];
    editedAttribute.value = editedAttribute.valueFrom = null;
  }
}
