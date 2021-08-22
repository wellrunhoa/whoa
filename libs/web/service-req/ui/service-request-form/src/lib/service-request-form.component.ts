import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ServiceRequest} from '@whoa/web/service-req/data-access'

@Component({
  selector: 'whoa-service-request-form',
  templateUrl: './service-request-form.component.html',
  styleUrls: ['./service-request-form.component.less']
})
export class ServiceRequestFormComponent {

  @Output() submitForm = new EventEmitter<ServiceRequest>();
  form: FormGroup;
  loading = false;
  stateList = [
    { label: 'KS', value: 'KS' },
    { label: 'NC', value: 'NC'},
    { label: 'TX', value: 'TX'},
    { label: 'AL', value: 'AL'},
    { label: 'AK', value: 'AK'}
  ];

  constructor(fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      propStreetAddress: [null, [Validators.required]], //, Validators.pattern(/^(user)$/)
      propCity: [null, [Validators.required]], //, Validators.pattern(/^(password)$/)
      propState: [null, [Validators.required]],
      propZip: [null, [Validators.required]],
      requestedService: [null, [Validators.required]],
      comments: [null, [Validators.maxLength(100)]],
      remember: [true]
    });
  }

  serviceReq(): void {
    const propStreetAddress = this.form.controls.propStreetAddress;
    const propCity = this.form.controls.propCity;
    const propState = this.form.controls.propState;
    const propZip = this.form.controls.propZip;
    const requestedService = this.form.controls.requestedService;
    const comments = this.form.controls.comments;


    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }
    
    this.submitForm.emit(this.form.value as ServiceRequest);
  }
}
