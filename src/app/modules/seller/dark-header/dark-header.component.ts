import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-header',
  templateUrl: './dark-header.component.html',
  styleUrls: ['./dark-header.component.scss']
})
export class DarkHeaderComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor() { }

  ngOnInit() {
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
}
