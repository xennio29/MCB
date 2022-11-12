import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Infraction } from '../model/infraction';
import { Match } from '../model/match';
import { Database } from './database';
import { DataBaseProvider } from './DataBaseProvider';
import { IpgDatabase } from './ipgDatabase';
import { PlayerDatabase } from './playerDatabase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /* The database once it's import. */
  private playerDatabase: PlayerDatabase = null;
  private ipgDatabase: IpgDatabase = null;

  constructor(private dataBaseProvider: DataBaseProvider) { 

    dataBaseProvider.playerDatabaseEmitter.subscribe( result => this.playerDatabase = result);
    dataBaseProvider.loadPlayerDatabase();

    dataBaseProvider.ipgDatabaseEmitter.subscribe( result => this.ipgDatabase = result);
    dataBaseProvider.loadIpgDatabase();
  }

  private playerDatabaseCall( method: string ) {
    return new Observable<any> ( observer => {

      if(this.playerDatabase !== null) {
        observer.next(this.playerDatabase[method]());
        observer.complete();
      } else {
        this.dataBaseProvider.playerDatabaseEmitter.subscribe(result => {
            observer.next(result[method]());
            observer.complete();
        });
      }
    });
  }

  private ipgDatabaseCall( method: string ) {
    return new Observable<any> ( observer => {
      if(this.playerDatabase !== null) {
        observer.next(this.ipgDatabase[method]());
        observer.complete();
      }
    });
  }

  getTournamentName(): Observable<string> {
    return this.playerDatabaseCall('getTournamentName');
  }

  getRoundNumber(): Observable<number> {
    return this.playerDatabaseCall('getRoundNumber');
  }

  getAllMatchs(): Observable<Match[]> {
    return this.playerDatabaseCall('getAllMatchs');
  }

  getInfractions(): Observable<Infraction[]> {
    return this.ipgDatabaseCall('getInfractions');
  }
}
