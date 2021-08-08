import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authenticate } from '@whoa/web/auth/data-access';

@Component({
  selector: 'whoa-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<Authenticate>();
  form: FormGroup;
  loading = false;
  
  constructor(fb: FormBuilder, private router: Router) {
    this.form = fb.group({
      userName: [null, [Validators.required]], //, Validators.pattern(/^(user)$/)
      password: [null, [Validators.required]], //, Validators.pattern(/^(password)$/)
      remember: [true]
    });
  }

  login(): void {
    const userName = this.form.controls.userName;
    const password = this.form.controls.password;

    userName.markAsDirty();
    userName.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    
    if (this.form.invalid) {
      return;
    }
    
    this.submitForm.emit({username: userName.value, password: password.value} as Authenticate);
  }
}