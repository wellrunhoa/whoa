import { AfterViewInit, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'whoa-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements AfterViewInit {
  @ViewChild('portletContentContainer', { read: ViewContainerRef })
  private viewContainerRef!: ViewContainerRef;

  constructor(private readonly cfr: ComponentFactoryResolver, private injector: Injector) {}

  ngAfterViewInit() {
    this.initPropertyForm();
  }

  async initPropertyForm() {
    this.viewContainerRef.clear();
    const { AddPropertyComponent } = await import('@whoa/web/property/feature/add-property');
    const component = this.cfr.resolveComponentFactory(AddPropertyComponent);
    const compRef = this.viewContainerRef.createComponent(component, undefined, this.injector);
    // compRef.instance.setData({
    //   workFlowFlag: true,
    //   parentRecordId: this.parentRecordId
    // });
  }
}
