import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'bc-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    standalone: false
})
export class SideBarComponent implements OnInit {

  whiteLogo = 'assets/img/mcb_logo.png';

  constructor() { }

  @Output() public sidenavClose = new EventEmitter();


  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
