import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data-model/data/data.service';
import { Infraction } from '../data-model/model/infraction';
import { Match } from '../data-model/model/match';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  tournamentName: string;
  judgeName = "Jordan LACOMBE"
  roundNumber: number;
  matchs: Match[]

  // No value store here, it just to have onTableNumberChange call and it need a link for ngModel
  tableNumber: number;
  player1 = "-";
  player2 = "-";
  selectedPlayer: string;

  infractions: Infraction[];
  selectedInfraction: Infraction;
  selectedPlayerName: string;

  details: string;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
    this.dataService.getTournamentName().subscribe(result => {
      this.tournamentName = result;
    })
    this.dataService.getRoundNumber().subscribe(result => {
      this.roundNumber = result;
    })
    this.dataService.getAllMatchs().subscribe(result => {
      this.matchs = result;
    })
    this.dataService.getInfractions().subscribe(result => {
      this.infractions = result;
    })
  }

  onTableNumberChange(tableNumber: any): void {
    const match = this.matchs.find(match => match.tableNumber == tableNumber);
    this.player1 = match.player1Name;
    this.player2 = match.player2Name
  }

  onSelectedPlayerChange(selectedPlayer: any): void {
    if (selectedPlayer=="player1Choice") {
      this.selectedPlayerName = this.player1;
    } else {
      this.selectedPlayerName = this.player2;
    }
  }

  openSnackBar(): void {
    this.snackBar.open("Infraction added to registry", "", {
      duration: 2 * 1000,
    });
  }
}
