import { Directive, ElementRef, forwardRef, HostListener, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessor),
  multi: true,
}

@Directive({
  selector: 'input([type=date])[ngModel],input([type=date])[formCotrol],input([type=date])[formControlName]',
  standalone: true,
  providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessor implements ControlValueAccessor {

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event.target.valueAsDate']) private onChange!: Function;
  @HostListener('blur', []) private onTouched!:Function;

  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date) => { fn(valueAsDate); }
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  writeValue(newValue: any): void {
    if(newValue instanceof Date) {
      this.element.nativeElement.value = newValue.toISOString().split('T')[0];
    }
  }
}
