import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';
import tournamentData from '../../../assets/tournamentData.json'
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _teams: Team[];

  public teamEmitter: EventEmitter<Team[]>;

  loaded = false;

  constructor(private http: HttpClient) { 

    this.teamEmitter = new EventEmitter();

  }


  loadData(): Observable<any> {

    return new Observable<any> ((observer) => {

      // PRODUCTION
      /*
      this.http.get<any>('https://raw.githubusercontent.com/xennio29/PushAndRoll/data/src/assets/tournamentData.json').subscribe(data => {
  
        console.log('Welcome to ' + data.tournamentName);
  
        this._teams = this.constructTeams(data.teams);
        console.log(this._teams.length + ' players imported.');


        observer.complete();
      });
      */

      // DEVELOPMENT
      console.log('Welcome to ' + tournamentData.tournamentName);
  
      this._teams = this.constructTeams(tournamentData.teams);
      console.log(this._teams.length + ' teams imported.');

      observer.complete();

    });

  }

  // ASKER
  //////////////////////

  askData(...datasType: DataType[]) {

    if(!this.loaded) {
      this.loadData().subscribe({
        complete: () => {
          this.loaded = true;
          this.emitData(...datasType);
        }
      });
    } else {
      this.emitData(...datasType);
    }

  }

  private emitData(...datasType: DataType[]) {

    datasType.forEach( dataType => {
      switch (dataType) {
        case DataType.Teams: this.teamEmitter.emit(this._teams);
      }
    })
  }

  // TEAM CONSTRUCTION
  //////////////////////

  private constructTeams(teams): Team[] {
    const tournamentTeams: Team[] = [];

    teams.forEach(team => {
      tournamentTeams.push(this.toTeamDomain(team));      
    });

    return tournamentTeams;
  }

  private toTeamDomain(team): Team {
    return new Team(
      this.toPlayerDomain(team.topLaner),
      this.toPlayerDomain(team.midLaner),
      this.toPlayerDomain(team.jungle),
      this.toPlayerDomain(team.botlaner),
      this.toPlayerDomain(team.support),
      team.name,
      team.id
    );

  }

  private toPlayerDomain(player): Player {
    return new Player(
      player.firstName,
      player.lastName,
      player.pseudo
    );

  }

}

export enum DataType {
  Teams
}
