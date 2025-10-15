export interface PropertyDto {
  type: 'string' | 'number';
  property: string;
}

export interface CustomerEventDto {
  type: string;
  properties: PropertyDto[];
}

export interface EventsDto {
  events: CustomerEventDto[];
}
