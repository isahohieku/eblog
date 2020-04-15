import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import {
  ControlValueAccessor, AbstractControl,
  ValidatorFn, Validators, ValidationErrors, NG_VALUE_ACCESSOR, NG_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: TextareaComponent,
      multi: true
    }
  ]
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

  constructor() { }

  ngOnInit() { }

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

  validate(c: AbstractControl): ValidationErrors {
    const validators: ValidatorFn[] = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }

    return validators;
  }

}
