import { Component, OnInit } from '@angular/core';
import { DataService, DataType } from '../data-model/data/data.service';
import { Player } from '../data-model/model/player';

@Component({
  selector: 'bc-tixbank',
  templateUrl: './tixbank.component.html',
  styleUrls: ['./tixbank.component.scss']
})
export class TixbankComponent implements OnInit {

  players: Player[] = [];

  constructor(private dataService: DataService) {

    this.dataService.playerEmitter.subscribe( result => {
      this.players = result;
    });

    this.dataService.askData(DataType.Player);

  }

  ngOnInit(): void {
  }

}
