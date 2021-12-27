/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { EventService, Property, UserContextService } from '@whoa/web/core/data-access';

@Component({
  selector: 'whoa-portlet',
  templateUrl: './portlet.component.html',
  styleUrls: ['./portlet.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PortletComponent {
  @Input() pageTitle!: string;
  @Input() pageSubTitle!: string;
  @Input() showProperty = true;
  @Input() contentTemplate!: TemplateRef<any>;

  @ViewChild('portletContentContainer', { read: ViewContainerRef })
  private contentContainer!: ViewContainerRef;

  constructor(private eventService: EventService, private userContextService: UserContextService) {}

  public get contentContainerRef() {
    return this.contentContainer;
  }

  get property(): Property {
    return this.userContextService.property;
  }
}
