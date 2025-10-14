import { NumberOperator, StringOperator } from '@customer_filter/app/shared/store/model';

type PropertyValueType = string | number;

export interface PropertyDomain {
  id: string;
  name: string;
  type: PropertyValueType;
}

export interface CustomerEventDomain {
  id: string;
  name: string;
  properties: PropertyDomain[];
}

export interface EventAttribute {
  id: string;
  value: PropertyValueType;
  valueFrom?: PropertyValueType; // if in between is selected as operator
  operator: StringOperator | NumberOperator;
  name: string | null;
}

export interface FunnelSteps {
  id: string;
  name: string | null;
  eventAttributes: EventAttribute[];
}
