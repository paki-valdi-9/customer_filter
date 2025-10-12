export interface Property {
  id: string;
  name: string;
  type: 'string' | 'number';
}

export interface CustomerEvent {
  id: string;
  name: string;
  properties: Property[];
}

export interface PropertyCondition {
  id: string;
  property: string | null;
  operator: string;
  value: string;
  propertyType?: 'string' | 'number';
}

export interface EventFilterGroup {
  id: string;
  event: string | null;
  properties: PropertyCondition[];
}
