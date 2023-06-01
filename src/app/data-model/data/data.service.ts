import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Player } from '../model/player';
import { TixProfil } from '../model/tixprofil';
import { MasterProfil } from '../model/masterprofil';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public tixProfilEmitter: EventEmitter<TixProfil[]>;
  private readonly tixProfilsFile = 'https://raw.githubusercontent.com/xennio29/Bat-flight/featureMcb/src/assets/TIX_MCB.csv';
  private _tixProfils: TixProfil[];

  public masterProfilEmitter: EventEmitter<MasterProfil[]>;
  private readonly masterProfilsFile = 'https://raw.githubusercontent.com/xennio29/Bat-flight/featureMcb/src/assets/MASTER_2023.csv';
  private _masterProfils: MasterProfil[];

  private loaded = false;

  constructor(private http: HttpClient) { 

    this.tixProfilEmitter = new EventEmitter();
    this.masterProfilEmitter = new EventEmitter();

  }


  loadData(): Observable<any> {

    return new Observable<any> ((observer) => {

      console.log("coucou");

      this.http.get(this.tixProfilsFile, {responseType: 'text'})
        .subscribe(tixProfils => {
  
        console.log('Reading TIX_MCB.csv');
        this._tixProfils = this.extractTixProfils(tixProfils);
        console.log(this._tixProfils.length + ' players were extract.');
      });

      this.http.get(this.masterProfilsFile, {responseType: 'text'})
        .subscribe(masterProfils => {
  
        console.log('Reading MASTER_2023.csv');
        this._masterProfils = this.extractMasterProfils(masterProfils);
        console.log(this._masterProfils.length + ' players were extract.');
      });

      var sources = [
        this.http.get(this.tixProfilsFile, {responseType: 'text'}),
        this.http.get(this.masterProfilsFile, {responseType: 'text'})
      ];

      forkJoin(sources).subscribe(test => {
        var test0 = test[0];
        console.log(test0);
        // should work


      });

      observer.complete
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
        case DataType.TIX_PROFIL: this.tixProfilEmitter.emit(this._tixProfils);
        case DataType.MASTER_PROFIL: this.masterProfilEmitter.emit(this._masterProfils);
      }
    })
  }

  private extractTixProfils(playersTix: string): TixProfil[] {
    const tixProfils: TixProfil[] = [];
    const lines = playersTix.split('\n');
    // remove header
    lines.splice(0, 1);
    lines.forEach(playerLine => tixProfils.push(this.extractTixProfil(playerLine)));
    return tixProfils;
  }

  private extractMasterProfils(playersTix: string): MasterProfil[] {
    const masterProfils: MasterProfil[] = [];
    const lines = playersTix.split('\n');
    // remove header
    lines.splice(0, 1);
    lines.forEach(playerLine => masterProfils.push(this.extractMasterProfil(playerLine)));
    return masterProfils;
  }

  private extractTixProfil(playerLine): TixProfil {
    const values : string[] = playerLine.split(',');
    values[0]
    return new TixProfil(
      values[0],
      values[1],
      values[2]
    );
  }

  private extractMasterProfil(playerLine): MasterProfil {
    const values : string[] = playerLine.split(',');
    values[0]
    return new MasterProfil(
      values[0],
      values[1],
      values[2]
    );
  }
}

export enum DataType {
  TIX_PROFIL,
  MASTER_PROFIL
}
