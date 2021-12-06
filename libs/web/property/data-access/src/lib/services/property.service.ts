import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  getDefaultProperty(): Observable<Property> {
    return this.http.get<Property>('api/hoa-property/default').pipe(map((res) => res));
  }

  register(property: Property): Observable<Property> {
    return this.http.post<Property>('api/hoa-property', property).pipe(map((res) => res));
  }
}
