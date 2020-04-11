import { Component, OnInit, Input, ViewChild, ElementRef, Self } from '@angular/core';
import {
  ControlValueAccessor, AbstractControl,
  ValidatorFn, Validators, NgControl
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', { static: false }) input: ElementRef;
  disabled;

  @Input() isRequired = false;
  @Input() textarea = false;
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
