import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, DataType } from '../data-model/data/data.service';
import { TixProfil } from '../data-model/model/tixprofil';
import { MasterProfil } from '../data-model/model/masterprofil';

@Component({
  selector: 'bc-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  displayedColumns = ['lastName', 'firstName', 'masterPoints'];

  masterProfils: MasterProfil[] = [];
  dataSource;

  constructor(private dataService: DataService) {

    this.dataService.masterProfilEmitter.subscribe( result => {
      this.masterProfils = result;
      this.dataSource = new MatTableDataSource(this.masterProfils);
    });

    this.dataService.askData(DataType.TIX_PROFIL);
  }

  ngOnInit(): void {
  }
}
