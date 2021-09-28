import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceRequest } from '@whoa/web/service-req/data-access';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    { label: 'NC', value: 'NC' },
    { label: 'TX', value: 'TX' },
    { label: 'AL', value: 'AL' },
    { label: 'AK', value: 'AK' }
  ];
  UPLOAD_FILE = 'file://C:/Downloads'; // File upload path - must be rest call

  constructor(fb: FormBuilder, private router: Router, private msg: NzMessageService, private message: NzModalService) {

    this.form = fb.group({
      propStreetAddress: [null, [Validators.required]], //, Validators.pattern(/^(user)$/)
      propCity: [null, [Validators.required]], //, Validators.pattern(/^(password)$/)
      propState: [null, [Validators.required]],
      propZip: [null, [Validators.required]],
      requestedService: [null, [Validators.required]],
      comments: [null, [Validators.maxLength(100)]],
      attachements: [null, null],
      remember: [true]
    });
  }

  fileList: NzUploadFile[] = [];
  beforeUpload = (file: NzUploadFile): boolean => {
    // Judgment on the upload file type
    const type = file.type;

    const str = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'];
    if (type != null && str.indexOf(type) < 0) {
      this.message.warning({
        nzTitle: 'Warning',
        nzContent: 'Select file failed, only pdf, jpg, jpeg, png and other formats are supported'
      });
      return false;
    }

    if (file.size != null) {
      // Limit on upload file size
      const isLt20M = file.size / 1024 / 1024 < 30;
      if (!isLt20M) {
        this.message.warning({
          nzTitle: 'Warning',
          nzContent: 'The file must be less than 30M'
        });
        return false;
      }
    }
    this.fileList = this.fileList.concat(file);
    // When the type and size meet the requirements, upload directly; if return false, then you need to call the upload method manually
    return true;
  }
  // Method to get the path when the file upload is finished     	 
  getFileUrl( info: NzUploadChangeParam ): void {
    const status = info.file.status;
    if (status === 'done') {
      //this.zizhi_prove = info.file.response.data
    } else if (status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
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
