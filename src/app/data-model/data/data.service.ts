import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../model/player';
import { TixProfil } from '../model/tixprofil';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public tixProfilEmitter: EventEmitter<TixProfil[]>;
  private readonly tixProfilFile = 'https://raw.githubusercontent.com/xennio29/Bat-flight/featureMcb/src/assets/TIX_MCB.csv';
  private _playersTix: TixProfil[];

  private loaded = false;

  constructor(private http: HttpClient) { 

    this.tixProfilEmitter = new EventEmitter();

  }


  loadData(): Observable<any> {

    return new Observable<any> ((observer) => {

      this.http.get(this.tixProfilFile, {responseType: 'text'})
        .subscribe(playersTix => {
  
        console.log('Reading TIX_MCB.csv');

        this._playersTix = this.extractPlayersTix(playersTix);
  
        console.log(this._playersTix.length + ' players were extract.');

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
        case DataType.TIX_PROFIL: this.tixProfilEmitter.emit(this._playersTix);
      }
    })
  }

  private extractPlayersTix(playersTix: string): TixProfil[] {
    const tixProfils: TixProfil[] = [];
    const lines = playersTix.split('\n');
    // remove header
    lines.splice(0, 1);
    lines.forEach(playerLine => tixProfils.push(this.extractPlayer(playerLine)));
    return tixProfils;
  }

  private extractPlayer(playerLine): TixProfil {
    const values : string[] = playerLine.split(',');
    values[0]
    return new TixProfil(
      values[0],
      values[1],
      values[2]
    );
  }
}

export enum DataType {
  TIX_PROFIL
}
