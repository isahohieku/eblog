import { Component, OnInit, Input, ViewChild, ElementRef, Self, forwardRef } from '@angular/core';
import {
  ControlValueAccessor, AbstractControl,
  ValidatorFn, Validators, NgControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', { static: false }) input: ElementRef;
  disabled;

  @Input() type = 'text';
  @Input() isRequired = false;
  @Input() pattern = '';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() errorMsg: string;
  @Input() customClass: string;
  control: AbstractControl;

  constructor(@Self() private controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
   }

  onChange(event) {
  }

  onTouched() { }

  writeValue(val: any): void {
    this.input.nativeElement.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
