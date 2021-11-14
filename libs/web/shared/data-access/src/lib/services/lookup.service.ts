import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Amenity } from '../model/amenity';

@Injectable({ providedIn: 'root' })
export class LookupService {
  constructor(private http: HttpClient) {}

  communityAmenities(communityId: string): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`api/amenities/community/${communityId}`).pipe(map(res => res));
  }
}

