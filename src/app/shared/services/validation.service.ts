import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() { }

  validateInput(event: any, validationType: string): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    switch (validationType) {
      case 'letterOnly':
        return this.letterOnly(charCode);
      case 'allowNumbersAndDot':
        this.allowNumbersAndDot(event);
        return true;
      case 'letterWithSomeSpecialCharacter':
        return this.letterWithSomeSpecialCharacter(charCode);
        case 'restrictInput':
        this.restrictInput(event);
        return true;
      default:
        return true;
    }
  }

  private letterOnly(charCode: number): boolean {
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32;
  }

  private allowNumbersAndDot(event: KeyboardEvent): void {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  private letterWithSomeSpecialCharacter(charCode: number): boolean {
    return (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode === 32 ||
      charCode === 38 ||
      charCode === 39 ||
      charCode === 46;
  }
  restrictInput(event: KeyboardEvent): void {
    if (
      !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key) &&
      !/^\d$/.test(event.key)
    ) {
      event.preventDefault();
    }
  }
}
