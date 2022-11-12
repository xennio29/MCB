import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { PlayerDatabase } from "./playerDatabase";
import * as tournamentData from './../../../assets/tournamentData.json'
import * as ipg from './../../../assets/IPG infraction.json'
import { IpgDatabase } from "./ipgDatabase";

/**
 * This class create the singleton of all the data extract from a JSON file. 
 */

 @Injectable({
    providedIn: 'root'
  })
export class DataBaseProvider {

    public playerDatabaseEmitter: EventEmitter<PlayerDatabase> = new EventEmitter();
    public ipgDatabaseEmitter: EventEmitter<IpgDatabase> = new EventEmitter();

    constructor() {}

    public loadPlayerDatabase(): void {
        const playerDatabase = new PlayerDatabase(tournamentData);
        this.playerDatabaseEmitter.emit(playerDatabase);
    }

    public loadIpgDatabase(): void {
      const ipgDatabase = new IpgDatabase(ipg);
      this.ipgDatabaseEmitter.emit(ipgDatabase);
  }
}