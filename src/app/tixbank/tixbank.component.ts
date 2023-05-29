import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, DataType } from '../data-model/data/data.service';
import { TixProfil } from '../data-model/model/tixprofil';

@Component({
  selector: 'bc-tixbank',
  templateUrl: './tixbank.component.html',
  styleUrls: ['./tixbank.component.scss']
})
export class TixbankComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['lastName', 'firstName', 'tixPoint'];

  tixProfils: TixProfil[] = [];
  dataSource;

  constructor(private dataService: DataService) {

    this.dataService.tixProfilEmitter.subscribe( result => {
      this.tixProfils = result;
      this.dataSource = new MatTableDataSource(this.tixProfils);
      this.dataSource.sort = this.sort;
    });

    this.dataService.askData(DataType.TIX_PROFIL);
  }

  ngOnInit(): void {
  }
}
