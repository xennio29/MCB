import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { MasterProfil, MasterProfilLine, fromMasterLinesToMasterProfils } from '../model/masterprofil';
import { TixProfil, TixProfilLine, fromTixLinesToTixProfils } from '../model/tixprofil';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public tixProfilEmitter: EventEmitter<TixProfil[]>;
  private readonly tixProfilsFile = 'https://raw.githubusercontent.com/xennio29/MCB/main/src/assets/data_tix.csv';
  private _tixProfils: TixProfil[] = [];

  public masterProfilEmitter: EventEmitter<MasterProfil[]>;
  private readonly masterProfilsFile = 'https://raw.githubusercontent.com/xennio29/MCB/main/src/assets/data_masters.csv';
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
    console.log("--> " + this._tixProfils.length + ' tix profils were extract.');
  }

  private extractMasterProfils(playersTix: string): void {
    console.log('Reading data_masters.csv');
    const masterProfilLines: MasterProfilLine[] = [];
    const lines = playersTix.split('\n');
    // remove header
    lines.splice(0, 1);
    lines.forEach(playerLine => masterProfilLines.push(this.extractMasterProfil(playerLine)));
    this._masterProfils = fromMasterLinesToMasterProfils(masterProfilLines);
    console.log("--> " + this._masterProfils.length + ' master profils were extract.');
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

  private extractMasterProfil(playerLine): MasterProfilLine {
    const values : string[] = playerLine.split(',');
    return new MasterProfilLine(
      values[0],
      values[1],
      values[2],
      values[3]
    );
  }
}

export enum DataType {
  TIX_PROFIL,
  MASTER_PROFIL
}
