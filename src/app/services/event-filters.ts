import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CustomerEvent, Property } from './models';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private url = 'https://br-fe-assignment.github.io/customer-events/events.json';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<CustomerEvent[]> {
    return this.http.get<any>(this.url).pipe(
      map(
        (data) =>
          (data.events || []).map((e: any) => ({
            id: e.type,
            name: e.type,
            properties: e.properties.map((p: any) => ({
              id: p.property,
              name: p.property,
              type: p.type as 'string' | 'number',
            })) as Property[],
          })) as CustomerEvent[]
      )
    );
  }
}
