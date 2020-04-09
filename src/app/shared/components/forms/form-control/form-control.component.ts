import { Component, OnInit, Input, ViewChild, ElementRef, Self, AfterViewInit } from '@angular/core';
import {
  ControlValueAccessor, Validator, AbstractControl,
  ValidatorFn, Validators, NgControl, NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
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

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    this.control = this.controlDir.control;
    const validators: ValidatorFn[] = this.control.validator ? [this.control.validator] : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  onChange(event) { }

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
