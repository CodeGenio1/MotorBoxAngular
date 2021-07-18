import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class PackagesResolver implements Resolve<any> {
  constructor(private userService: UserService, private router: Router) { }

  resolve() {
    const user = this.userService.getUser();
    if (!isNullOrUndefined(user)) {
      if (user.user.role.find(x => x === "Dealer")) {
        return
      } else if (user.user.role.find(x => x === "Buyer")) {
        this.router.navigate(['/buyer/home']);
      } else if (user.user.role.find(x => x === "Seller")) {
        this.router.navigate(['/seller/seller-home']);
      }
    } else {
      this.router.navigate(['/home']);

    }
  }
}
