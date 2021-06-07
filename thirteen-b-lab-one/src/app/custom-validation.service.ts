import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  confirmPasswordValidator: any;
  patternValidator(): import("@angular/forms").ValidatorFn | null | undefined {
    throw new Error('Method not implemented.');
  }
  userNameValidator: any;

  constructor() { }
}
