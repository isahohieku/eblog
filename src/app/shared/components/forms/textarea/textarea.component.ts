import { Component, OnInit, Input, ViewChild, Self, ElementRef, forwardRef, Optional } from '@angular/core';
import {
  ControlValueAccessor, AbstractControl,
  ValidatorFn, Validators, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', { static: false }) input: ElementRef;
  @Input() disabled = false;

  @Input() isRequired = true;
  @Input() textarea = false;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() errorMsg: string;
  @Input() customClass: string;
  control: AbstractControl;

  constructor(@Optional() @Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }
  ngOnInit() {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
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
