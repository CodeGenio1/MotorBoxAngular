import { Component,OnDestroy,OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { HttpStateService } from './services/http-state.service';
import { untilDestroyed } from './services/until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'app';
  /**
   *
   */
  show = false;
  loading = false;
  constructor(private httpStateService: HttpStateService,private service:AuthenticationService) {

  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.httpStateService.state.pipe(untilDestroyed(this)).subscribe((progress: any) => {
      debugger;
      this.loading = progress;
      this.show = (progress) ? false : true;
    });
  }

}
