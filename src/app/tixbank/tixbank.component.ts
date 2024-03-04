import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, DataType } from '../data-model/data/data.service';
import { TixChangeByEvent, TixProfil } from '../data-model/model/tixprofil';

@Component({
  selector: 'bc-tixbank',
  templateUrl: './tixbank.component.html',
  styleUrls: ['./tixbank.component.scss']
})
export class TixbankComponent implements OnInit {

  private static frToEn: Map<string, string> = new Map ([
    ["january", "janvier"],
    ["february", "février"],
    ["march", "mars"],
    ["april", "avril"],
    ["may", "mai"],
    ["june", "juin"],
    ["july", "juillet"],
    ["august", "août"],
    ["september", "septembre"],
    ["october", "octobre"],
    ["november", "novembre"],
    ["december", "décembre"]
    ]);

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'date', 'tixDiff'];

  tixProfils: TixProfil[] = [];
  filteredTixProfils: TixProfil[] = this.tixProfils;

  constructor(private dataService: DataService) {

    this.dataService.tixProfilEmitter.subscribe( result => {
      this.tixProfils = result;
      this.tixProfils.sort((profilA, profilB) => profilA.name > profilB.name ? 1 : -1)
      this.filteredTixProfils = result
    });

    this.dataService.askData(DataType.TIX_PROFIL);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredTixProfils = this.tixProfils.filter(tixProfil => tixProfil.name.trim().toLowerCase().match('.*' + filterValue + '.*'));
  }

  callGetTotalTix(tixProfil : TixProfil) {
    return tixProfil.getTotalTix();
  }

  generateDataSource(tixProfil: TixProfil): MatTableDataSource<TixChangeByEvent> {
    let sortedTixChangeEvent = tixProfil.tixChanges.sort( (a, b) => a.date < b.date ? 1 : -1);
    return new MatTableDataSource(sortedTixChangeEvent);
  }
}
