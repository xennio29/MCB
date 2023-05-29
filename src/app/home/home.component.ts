import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  belugasLogo = 'assets/img/redblack_logo.png';
  discordLogo = 'assets/img/4771549-circle-discord-gaming-messenger-round-icon-icon-discord-icon-png-512_512_preview.png';

  constructor() { }

  ngOnInit(): void {
  }

  goDiscord(){
    window.open("https://discord.gg/6G6KyYj9sM", "_blank");
  }
}
