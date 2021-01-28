import { Component, OnInit } from '@angular/core';
import { DataService, DataType } from '../data-model/data/data.service';
import { Match } from '../data-model/model/match';
import { Team } from '../data-model/model/team';

@Component({
  selector: 'bc-matchs',
  templateUrl: './matchs.component.html',
  styleUrls: ['./matchs.component.scss']
})
export class MatchsComponent implements OnInit {

  teams: Team[] = [];

  matchsRonde1: Match[] = [];
  matchsRonde2: Match[] = [];
  matchsRonde3: Match[] = [];

  constructor(private dataService: DataService) {

    this.dataService.teamEmitter.subscribe( result => {
      this.teams = result;
      this.structureMatch();
    });

    this.dataService.askData(DataType.Teams);
  }

  ngOnInit(): void {
  }

  /**
   * Strucure all the match from all participants
   * Instead of having a database for match victory, the victory is set here
   */
  structureMatch() {

    this.matchsRonde1.push(new Match(this.teams[0], null, this.teams[1], null, "date to define"));
    this.matchsRonde1.push(new Match(this.teams[2], null, this.teams[3], null, "date to define"));
    this.matchsRonde1.push(new Match(this.teams[4], null, this.teams[5], null, "date to define"));
    this.matchsRonde1.push(new Match(this.teams[6], null, this.teams[7], null, "date to define"));

    this.matchsRonde2.push(
      new Match(
        this.matchsRonde1[0].winner,
        "Winner of match 1 of ronde 1",
        this.matchsRonde1[1].winner,
        "Winner of match 2 of ronde 1",
        "date to define"));
    this.matchsRonde2.push(
      new Match(
        this.matchsRonde1[2].winner,
        "Winner of match 3 of ronde 1",
        this.matchsRonde1[3].winner,
        "Winner of match 4 of ronde 1",
        "date to define"));
    this.matchsRonde2.push(
      new Match(
        this.matchsRonde1[0].looser,
        "Losser of match 1 of ronde 1",
        this.matchsRonde1[1].looser,
        "Losser of match 2 of ronde 1",
        "date to define"));
    this.matchsRonde2.push(
      new Match(
        this.matchsRonde1[2].looser,
        "Losser of match 3 of ronde 1",
        this.matchsRonde1[3].looser,
        "Losser of match 4 of ronde 1",
        "date to define"));

    this.matchsRonde3.push(
      new Match(
        this.matchsRonde2[0].winner,
        "Winner of match 1 of ronde 2",
        this.matchsRonde2[1].winner,
        "Winner of match 2 of ronde 2",
        "date to define"));
    this.matchsRonde3.push(
      new Match(
        this.matchsRonde2[0].looser,
        "Losser of match 1 of ronde 2",
        this.matchsRonde2[1].looser,
        "Losser of match 2 of ronde 2",
        "date to define"));
    this.matchsRonde3.push(
      new Match(
        this.matchsRonde2[2].winner,
        "Winner of match 3 of ronde 2",
        this.matchsRonde2[3].winner,
        "Winner of match 4 of ronde 2",
        "date to define"));
    this.matchsRonde3.push(
      new Match(
        this.matchsRonde2[2].looser,
        "Losser of match 3 of ronde 2",
        this.matchsRonde2[3].looser,
        "Losser of match 4 of ronde 2",
        "date to define"));

  }

}
