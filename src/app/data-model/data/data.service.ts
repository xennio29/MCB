import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { MasterProfil } from '../model/masterprofil';
import { TixProfil, TixProfilLine, fromTixLinesToTixProfils } from '../model/tixprofil';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public tixProfilEmitter: EventEmitter<TixProfil[]>;
  private readonly tixProfilsFile = 'https://raw.githubusercontent.com/xennio29/MCB/main/src/assets/data_tix.csv';
  private _tixProfils: TixProfil[] = [];

  public masterProfilEmitter: EventEmitter<MasterProfil[]>;
  private readonly masterProfilsFile = 'https://raw.githubusercontent.com/xennio29/MCB/main/src/assets/MASTERS_2023.csv';
  private _masterProfils: MasterProfil[] = [];

  private sources = [
    this.http.get(this.tixProfilsFile, {responseType: 'text'}),
    this.http.get(this.masterProfilsFile, {responseType: 'text'})
  ];

  private loaded = false;

  constructor(private http: HttpClient) { 

    this.tixProfilEmitter = new EventEmitter();
    this.masterProfilEmitter = new EventEmitter();

  }

  loadData(): Observable<any> {
    return new Observable<any> ((observer) => {
      forkJoin(this.sources).subscribe(sheets => {
        var tixProfils = sheets[0];
        this.extractTixProfils(tixProfils);
        var masterProfils = sheets[1];
        this.extractMasterProfils(masterProfils);
        observer.complete();
      });
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

  private extractTixProfils(playersTix: string): void {
    console.log('Reading data_tix.csv');
    const lines = playersTix.split('\n');
    let tixProfilsLines: TixProfilLine[] = [];
    // remove header
    lines.splice(0, 1);
    lines.forEach(playerLine => tixProfilsLines.push(this.extractTixProfilLine(playerLine)));
    this._tixProfils = fromTixLinesToTixProfils(tixProfilsLines);
    console.log(this._tixProfils);
    console.log("--> " + this._tixProfils.length + ' players were extract.');
  }

  private extractMasterProfils(playersTix: string): void {
    console.log('Reading MASTER_2023.csv');
    const masterProfils: MasterProfil[] = [];
    const lines = playersTix.split('\n');
    // remove header
    lines.splice(0, 2);
    lines.forEach(playerLine => {
      var masterProfil = this.extractMasterProfil(playerLine);
      if (masterProfil != null) {
        this._masterProfils.push(masterProfil);
      }
    });
    console.log("--> " + this._masterProfils.length + ' players were extract.');
  }

  private extractTixProfilLine(playerLine): TixProfilLine {
    const values : string[] = playerLine.split(',');
    return new TixProfilLine(
      values[0],
      values[1],
      values[2],
      values[3]
    );
  }

  private extractMasterProfil(playerLine): MasterProfil {
    const values : string[] = playerLine.split(';');
    var points = values[0];
    var name = values[1];
    if (name != undefined && name.length != 0
      && points != undefined && points != "0") {
        return new MasterProfil(
          name,
          points
        );
    }
    return null;
  }
}

export enum DataType {
  TIX_PROFIL,
  MASTER_PROFIL
}
