import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Amenity } from '../model/amenity';
import { Community } from '../model/community';
import { State } from '../model/state';

@Injectable({ providedIn: 'root' })
export class LookupService {
  constructor(private http: HttpClient) {}

  communityAmenities(communityId: string): Observable<Amenity[]> {
    return this.http
      .get<Amenity[]>(`api/amenities/community/${communityId}`)
      .pipe(map((res) => res));
  }

  communities(name: string): Observable<Community[]> {
    const params = new HttpParams().set('name', name);
    return this.http
      .get<Community[]>('api/hoa-board/community/search/name', { params: params })
      .pipe(map((res) => res));
  }

  states(): Observable<State[]> {
    const states: State[] = [
      { id: '113232', name: 'KS' },
      { id: '434343', name: 'TX' },
      { id: '564343', name: 'NC' },
      { id: '350122', name: 'MO' }
    ];

    return of(states);
  }
}
