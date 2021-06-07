import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SubscriptionService } from './subscription.service';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  [x: string]: any;

  setUserDetails() {
    throw new Error('Method not implemented.');
  }
  setTempUserId() {
    throw new Error('Method not implemented.');
  }
  oldUserId(oldUserId: any, userId: any) {
    throw new Error('Method not implemented.');
  }
  login(user: any) {
    return this.http.post<any>('/api/login', user)
      .pipe(map((response: { token: string; userDetails: { userId: string; }; carItemCount: any; }) => {
        if (response && response.token) {
          //this.oldUserId = localStorage.getItem('userId');
          localStorage.setItem('authToken', response.token);
          this.setUserDetails();
          localStorage.setItem('userId', response.userDetails.userId);
          this.subscriptionService.cartItemcount$.next(response.carItemCount);
        }
        return response;
      }));
  }

  constructor(

private http:HttpClient ,
private subscriptionService:SubscriptionService   ) { }
}
