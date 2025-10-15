import { NumberOperator, StringOperator } from '../../../shared/store/model';

export interface PropertyCondition {
  id: string;
  property: string | null;
  operator: StringOperator | NumberOperator;
  value: string;
  value2?: string; // if in between is selected as operator
  propertyType?: 'string' | 'number';
}

export interface FunnelSteps {
  id: string;
  event: string | null;
  properties: PropertyCondition[];
}
