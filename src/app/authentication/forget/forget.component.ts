import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  email = '';
  constructor(private messageService: MessageService, public authService: AuthenticationService, private router: Router
    , private _ActivatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
  }
  async forget() {
      try {
        this.userService.removeRefreshToken();
        this.userService.removeToken();
        const res = await this.authService.forget(this.email);
        if (res) {
          this.showSuccess('')
          // alert('Register Successfull');
          this.router.navigate(['home']);
        }
      } catch (err) {
        err.error.message.forEach(element => {
          this.messageService.add({severity:'error', summary: 'Error', detail: element.msg});
        });

      }
  }

  showSuccess(data: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: data });
  }
}
