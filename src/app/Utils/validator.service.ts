import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public nonEmptyString(str: string): boolean {
    return str != null && str.length > 0;
  }
}
