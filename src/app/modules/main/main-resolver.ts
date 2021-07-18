import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
const ACCESS_TOKEN = 'access_token';

@Injectable()
export class MainResolver implements Resolve<any> {
  constructor(private userService: UserService, private router: Router) { }

  resolve() {
    const user = this.userService.getUser();
    if (!isNullOrUndefined(user)) {
      if (user.user.role.find(x=>x === "Buyer")) {
        this.router.navigate(['/buyer/home']);
      } else {
        this.router.navigate(['/seller/seller-home']);
      }
    } else {
      return
    }
  }
}
