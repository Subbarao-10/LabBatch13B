import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  userData: any;
  cartItemcount$: any;

  constructor() { }
}
