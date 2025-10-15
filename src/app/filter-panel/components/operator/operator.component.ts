import { Component, Input, OnChanges } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventAttribute } from '../../store/model';
import { NUMBER_OPS_CONST, STRING_OPS_CONST } from '../../../shared/store/constants';
import { NumberOperator, StringOperator } from '../../../shared/store/model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-operator-component',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
})
export class OperatorComponent implements OnChanges {
  @Input() selectedStepName: string | undefined;
  @Input() selectedAttribute: EventAttribute | undefined;
  @Input() selectedAttributeOperators: NumberOperator[] | StringOperator[] = STRING_OPS_CONST;

  ngOnChanges(): void {
    this.adjustValuesForOperator();
  }

  protected onOperatorChange() {
    this.adjustValuesForOperator();
  }

  private adjustValuesForOperator() {
    const isNumber = NUMBER_OPS_CONST.find((op) => op === this.selectedAttribute?.operator);
    if (isNumber) {
      this.selectedAttribute!.value = 0;
      this.selectedAttribute!.valueFrom =
        this.selectedAttribute?.operator === 'in between' ? 0 : undefined;
    } else {
      this.selectedAttribute!.value = null;
      this.selectedAttribute!.valueFrom = undefined;
    }
  }
}
