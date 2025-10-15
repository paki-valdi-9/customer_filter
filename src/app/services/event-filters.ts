import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CustomerEventDto, EventsDto, PropertyDto } from './models';
import { CustomerEventDomain } from '../filter-panel/store/model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private url = 'https://br-fe-assignment.github.io/customer-events/events.json';
  private readonly http = inject(HttpClient);

  toDomainEvents(): Observable<CustomerEventDomain[]> {
    return this.http.get<EventsDto>(this.url).pipe(
      map((fetchedData) => {
        return (fetchedData.events || []).map((event: CustomerEventDto) => ({
          id: uuidv4(),
          name: event.type,
          properties: event.properties.map((property: PropertyDto) => ({
            id: uuidv4(),
            type: property.type,
            name: property.property,
          })),
        }));
      })
    );
  }
}
