import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/data-model/model/team';

@Component({
  selector: 'bc-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input() team: Team;
  dataSource: PlayerData[] = [];
  displayedColumns: string[] = ['icon', 'pseudo'];

  topLanerLogo = 'assets/img/role icon/Top_icon.png';
  midLanerLogo = 'assets/img/role icon/Middle_icon.png';
  jungleLogo = 'assets/img/role icon/Jungle_icon.png';
  botLogo = 'assets/img/role icon/Bottom_icon.png';
  supportLogo = 'assets/img/role icon/Support_icon.png';

  constructor() {

  }

  ngOnInit(): void {
    this.dataSource.push(new PlayerData(this.topLanerLogo, this.team.topLaner.pseudo));
    this.dataSource.push(new PlayerData(this.midLanerLogo, this.team.midLaner.pseudo));
    this.dataSource.push(new PlayerData(this.jungleLogo, this.team.jungle.pseudo));
    this.dataSource.push(new PlayerData(this.botLogo, this.team.botlaner.pseudo));
    this.dataSource.push(new PlayerData(this.supportLogo, this.team.support.pseudo));
  }

}

export class PlayerData {

  public icon: string;
  public pseudo: string;

  constructor(pseudo: string, icon: string) {

    this.pseudo = pseudo;
    this.icon = icon;

  }

}
