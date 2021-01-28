import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Match } from 'src/app/data-model/model/match';

@Component({
  selector: 'bc-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {


  @Input() match: Match;


  constructor() { }

  ngOnInit(): void {

  }


}