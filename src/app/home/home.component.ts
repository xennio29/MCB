import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logo = 'assets/img/mcb_logo.png';
  discordLogo = 'assets/img/discord_logo.png';

  constructor() { }

  ngOnInit(): void {
  }

  goDiscord(){
    window.open("https://discord.gg/2wxRaB5aK2", "_blank");
  }
}
