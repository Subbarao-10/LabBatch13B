import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { SubscriptionService } from 'src/app/subscription.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/user.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  showPassword = true;
  userId: any;
  private unsubscribe$ = new Subject<void>();
  cartService: any;
  wishlistService: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private subscriptionService: SubscriptionService) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.subscriptionService.userData.asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: User) => {
        this.userId = data.userId;
      });
  }

  login() {
    if (this.loginForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.authenticationService.login(this.loginForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.setShoppingCart();
            this.setWishlist();
            this.router.navigate([returnUrl]);
          },
          () => {
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            });
          });
    }
  }

  setShoppingCart() {
    this.cartService.setCart(this.authenticationService.oldUserId, this.userId)
      .subscribe((result: any) => {
        this.subscriptionService.cartItemcount$.next(result);
      }, (error: any) => {
        console.log('Error ocurred while setting shopping cart : ', error);
      });
  }

  setWishlist() {
    this.wishlistService.getWishlistItems(this.userId).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
