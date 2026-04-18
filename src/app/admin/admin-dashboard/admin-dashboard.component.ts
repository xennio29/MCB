import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../data-model/data/data.service';

interface Player {
  firstName: string;
  lastName: string;
  fullName: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: false
})
export class AdminDashboardComponent implements OnInit {
  loading = false;
  
  // Autocomplete for Tix/Master additions
  playerSearchControl = new FormControl('');
  // Autocomplete for Player management (deletion)
  playerManageControl = new FormControl('');
  
  allPlayers: Player[] = [];
  filteredPlayers: Observable<Player[]>;
  filteredPlayersManage: Observable<Player[]>;

  selectedPlayerForManage: Player | null = null;

  tixData = {
    firstName: '',
    lastName: '',
    amount: 0,
    date: new Date(),
    eventName: ''
  };

  masterData = {
    firstName: '',
    lastName: '',
    points: 0,
    date: new Date()
  };

  eventData = {
    title: '',
    description: '',
    date: new Date(),
    image: ''
  };

  constructor(private dataService: DataService) {
    this.filteredPlayers = this.playerSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    
    this.filteredPlayersManage = this.playerManageControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  async ngOnInit() {
    // Load existing players to populate autocomplete
    combineLatest([
      this.dataService.getTixProfils(),
      this.dataService.getMasterProfils()
    ]).subscribe(([tixProfils, masterProfils]) => {
      const playerMap = new Map<string, Player>();
      
      const processProfils = (profils: any[]) => {
        profils.forEach(p => {
          const fullName = `${p.firstName} ${p.lastName}`.trim();
          if (fullName && !playerMap.has(fullName.toLowerCase())) {
            playerMap.set(fullName.toLowerCase(), {
              firstName: p.firstName,
              lastName: p.lastName,
              fullName: fullName
            });
          }
        });
      };

      processProfils(tixProfils);
      processProfils(masterProfils);
      
      this.allPlayers = Array.from(playerMap.values()).sort((a, b) => a.fullName.localeCompare(b.fullName));
    });
  }

  private normalize(str: string): string {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  private _filter(value: string | Player): Player[] {
    const filterValue = typeof value === 'string' ? this.normalize(value) : this.normalize(value.fullName);
    return this.allPlayers.filter(player => 
      this.normalize(player.fullName).includes(filterValue)
    );
  }

  onPlayerSelected(player: Player) {
    this.tixData.firstName = player.firstName;
    this.tixData.lastName = player.lastName;
    this.masterData.firstName = player.firstName;
    this.masterData.lastName = player.lastName;
    this.playerSearchControl.setValue('');
  }

  onPlayerSelectedForManage(player: Player) {
    this.selectedPlayerForManage = player;
  }

  async onDeletePlayerTix() {
    if (!this.selectedPlayerForManage) return;
    
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer TOUT l'historique TIX de ${this.selectedPlayerForManage.fullName} ?`);
    if (confirmDelete) {
      this.loading = true;
      const { error } = await this.dataService.deletePlayerTix(this.selectedPlayerForManage.firstName, this.selectedPlayerForManage.lastName);
      if (!error) {
        alert('Historique TIX supprimé.');
      } else {
        alert('Erreur lors de la suppression.');
      }
      this.loading = false;
    }
  }

  async onDeletePlayerMasters() {
    if (!this.selectedPlayerForManage) return;
    
    const confirmDelete = confirm(`Voulez-vous vraiment supprimer TOUT l'historique Master de ${this.selectedPlayerForManage.fullName} ?`);
    if (confirmDelete) {
      this.loading = true;
      const { error } = await this.dataService.deletePlayerMasters(this.selectedPlayerForManage.firstName, this.selectedPlayerForManage.lastName);
      if (!error) {
        alert('Historique Master supprimé.');
      } else {
        alert('Erreur lors de la suppression.');
      }
      this.loading = false;
    }
  }

  async onAddTix() {
    this.loading = true;
    try {
      await this.dataService.addTixEntry(
        this.tixData.firstName,
        this.tixData.lastName,
        this.tixData.amount,
        this.tixData.date,
        this.tixData.eventName
      );
      alert('TIX ajoutés avec succès !');
      this.resetTixForm();
    } catch (e) {
      alert('Erreur lors de l\'ajout des TIX');
    }
    this.loading = false;
  }

  async onAddMaster() {
    this.loading = true;
    try {
      await this.dataService.addMasterEntry(
        this.masterData.firstName,
        this.masterData.lastName,
        this.masterData.points,
        this.masterData.date
      );
      alert('Points Master ajoutés avec succès !');
      this.resetMasterForm();
    } catch (e) {
      alert('Erreur lors de l\'ajout des points Master');
    }
    this.loading = false;
  }

  async onCreateEvent() {
    this.loading = true;
    try {
      await this.dataService.createEvent(
        this.eventData.title,
        this.eventData.date.toISOString(),
        this.eventData.description,
        this.eventData.image
      );
      alert('Événement créé avec succès !');
      this.resetEventForm();
    } catch (e) {
      alert('Erreur lors de la création de l\'événement');
    }
    this.loading = false;
  }

  private resetTixForm() {
    this.tixData = { firstName: '', lastName: '', amount: 0, date: new Date(), eventName: '' };
  }

  private resetMasterForm() {
    this.masterData = { firstName: '', lastName: '', points: 0, date: new Date() };
  }

  private resetEventForm() {
    this.eventData = { title: '', description: '', date: new Date(), image: '' };
  }
}
