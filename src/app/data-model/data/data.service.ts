import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import data from '../../../assets/data.json'
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public playerEmitter: EventEmitter<Player[]>;

  private loaded = false;

  constructor(private http: HttpClient) { 

    this.playerEmitter = new EventEmitter();

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
      console.log('Reading data.json');

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
        // case DataType.Player: this.playerEmitter.emit(this._teams);
      }
    })
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
  Player
}
