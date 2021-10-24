/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Event interface
 */
interface Event {
  key: string;
  payload?: any; // optional
}

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _eventBus: Subject<Event>;

  constructor() {
    this._eventBus = new Subject();
  }

  /**
   * Use this dispatch an event
   *
   * Examples:
   * eventService.dispatch("sessionTimeout");
   *
   * eventService.dispatch("switchLob", {lob: "new_lob"});
   *
   * @param key
   * @param data
   */
  dispatch(key: string, payload?: any) {
    this._eventBus.next({ key, payload });
  }

  /**
   * Use this subscribe for an event
   *
   * Examples:
   * eventService.on("switchLob").subscribe(lob => { console.log(lob); });
   *
   * @param key
   */
  on(key: string): Observable<any> {
    return this._eventBus.asObservable().pipe(
      filter(event => event.key === key),
      map(event => event.payload)
    );
  }

  /**
   * Use this to invoke callback on event
   *
   * Examples:
   * eventService.listen("switchLob", (lob) => { console.log(lob); });
   *
   * @param key
   * @param callback
   */
  listen(key: string, callback: any): any {
    this._eventBus
      .asObservable()
      .pipe(
        filter(event => event.key === key),
        map(event => event.payload),
        untilDestroyed(this)
      )
      .subscribe(payload => {
        callback(payload);
      });
  }
}
