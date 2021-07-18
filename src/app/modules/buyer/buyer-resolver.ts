import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Injectable()
export class BuyerResolver implements Resolve<any> {
  constructor(private userService: UserService, private router: Router) { }

  async resolve() {
    const user = this.userService.getUser();
    if (!isNullOrUndefined(user)) {
      const role = user.user.role.find(x => x)
      if (role !== "Buyer") {
        this.router.navigate(['/seller/seller-home']);
      } else {
        return
      }
    } else {
      this.router.navigate(['/sign-in']);
    }
  }
}
