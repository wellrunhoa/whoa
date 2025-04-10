import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HoaProperty } from '../models/hoa-property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  getDefaultProperty(): Observable<HoaProperty> {
    return this.http.get<HoaProperty>('api/hoa-property/default').pipe(map((res) => res));
  }

  getProperties(): Observable<Array<HoaProperty>> {
    return this.http.get<Array<HoaProperty>>('api/hoa-property/list').pipe(map((res) => res));
  }

  register(property: HoaProperty): Observable<HoaProperty> {
    return this.http.post<HoaProperty>('api/hoa-property', property).pipe(map((res) => res));
  }

  update(property: HoaProperty): Observable<HoaProperty> {
    return this.http.put<HoaProperty>('api/hoa-property', property).pipe(map((res) => res));
  }
}
