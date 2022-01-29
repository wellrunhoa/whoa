import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UpdatePassword } from '@whoa/web/auth/data-access';

@Component({
  selector: 'whoa-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent {
  form: FormGroup;
  loading = false;

  @Output() submitForm = new EventEmitter<UpdatePassword>();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      currentPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm: [null, [Validators.required, this.passwordMatchValidator()]]
    });
  }

  public passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      const control1 = control.parent?.get('password');
      if (control1?.value !== control.value) {
        return { confirm: true };
      }
      return null;
    };
  }

  submit(): void {
    const updatePwd = this.form.value as UpdatePassword;
    if (this.form.valid) {
      this.submitForm.emit(updatePwd);
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
