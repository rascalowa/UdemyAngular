import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'reverse'
})

export class ReversePipe implements PipeTransform {
  splittedValue: string[];
  reversedArray: string[];
  reversedString: string;

  transform(value: string) {
    this.splittedValue = value.split('');
    this.reversedArray = this.splittedValue.reverse();
    this.reversedString = this.reversedArray.join('');
    return this.reversedString;

  }
}
