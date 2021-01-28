import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, DataType } from '../data-model/data/data.service';
import { Team } from '../data-model/model/team';

@Component({
  selector: 'bc-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  teams: Team[] = [];

  constructor(private dataService: DataService) {

    this.dataService.teamEmitter.subscribe( result => {
      this.teams = result;
    });

    this.dataService.askData(DataType.Teams);

  }

  ngOnInit(): void {}

}
