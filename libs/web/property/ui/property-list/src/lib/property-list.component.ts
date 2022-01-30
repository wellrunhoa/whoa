import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HoaProperty } from '@whoa/web/property/data-access';

@Component({
  selector: 'whoa-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {
  loading = false;

  @Input()
  properties: Array<HoaProperty | null>;

  @Output() editProperty = new EventEmitter<HoaProperty>();
  @Output() addProperty = new EventEmitter();

  add() {
    this.addProperty.emit();
  }

  edit(property: HoaProperty) {
    this.editProperty.emit(property);
  }
}
