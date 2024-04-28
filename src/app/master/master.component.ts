import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService, DataType } from '../data-model/data/data.service';
import { TixProfil } from '../data-model/model/tixprofil';
import { MasterChangeByEvent, MasterProfil } from '../data-model/model/masterprofil';

@Component({
  selector: 'bc-master',
  templateUrl: './master.component.html',
  styleUrls: ['./../tixbank/tixbank.component.scss']
})
export class MasterComponent implements OnInit {

  displayedColumns = ['name', 'date', 'masterPoints'];

  masterProfils: MasterProfil[] = [];
  filteredMasterProfils: MasterProfil[] = this.masterProfils;

  constructor(private dataService: DataService) {

    this.dataService.masterProfilEmitter.subscribe( result => {
      this.masterProfils = result;
      this.masterProfils.sort((profilA, profilB) => profilB.getTotalMasterPoints() - profilA.getTotalMasterPoints())
      this.filteredMasterProfils = this.masterProfils
    });

    this.dataService.askData(DataType.MASTER_PROFIL);
  }

  ngOnInit(): void {
  }
  generateDataSource(masterProfil: MasterProfil): MatTableDataSource<MasterChangeByEvent> {
    let sortedMasterChangeEvent = masterProfil.masterChanges.sort( (a, b) => a.date < b.date ? 1 : -1);
    return new MatTableDataSource(sortedMasterChangeEvent);
  }
}
