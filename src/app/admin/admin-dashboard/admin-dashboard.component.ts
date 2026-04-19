import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../data-model/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog.component';

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
  
  // Réservations groupées par événement
  reservationsByEvent: { eventName: string, date: string, reservations: any[] }[] = [];

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

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
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
    this.loadReservations();
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

  private async loadReservations() {
    const { data } = await this.dataService.getReservations();
    if (data) {
      // Grouper par événement
      const grouped = new Map<string, { eventName: string, date: string, reservations: any[] }>();
      
      data.forEach(res => {
        const eventTitle = res.events?.title || 'Événement Inconnu';
        const eventDate = res.events?.event_date || '';
        
        if (!grouped.has(eventTitle)) {
          grouped.set(eventTitle, { eventName: eventTitle, date: eventDate, reservations: [] });
        }
        grouped.get(eventTitle)!.reservations.push(res);
      });

      this.reservationsByEvent = Array.from(grouped.values()).sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }
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
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Suppression Historique TIX',
        message: `Voulez-vous vraiment supprimer TOUT l'historique TIX de ${this.selectedPlayerForManage.fullName} ?`,
        confirmText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.loading = true;
        const { error } = await this.dataService.deletePlayerTix(this.selectedPlayerForManage!.firstName, this.selectedPlayerForManage!.lastName);
        if (!error) {
          this.snackBar.open('Historique TIX supprimé.', 'OK', { duration: 3000 });
        } else {
          this.snackBar.open('Erreur lors de la suppression.', 'Fermer', { duration: 5000 });
        }
        this.loading = false;
      }
    });
  }

  async onDeletePlayerMasters() {
    if (!this.selectedPlayerForManage) return;
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Suppression Historique Master',
        message: `Voulez-vous vraiment supprimer TOUT l'historique Master de ${this.selectedPlayerForManage.fullName} ?`,
        confirmText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.loading = true;
        const { error } = await this.dataService.deletePlayerMasters(this.selectedPlayerForManage!.firstName, this.selectedPlayerForManage!.lastName);
        if (!error) {
          this.snackBar.open('Historique Master supprimé.', 'OK', { duration: 3000 });
        } else {
          this.snackBar.open('Erreur lors de la suppression.', 'Fermer', { duration: 5000 });
        }
        this.loading = false;
      }
    });
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
      this.snackBar.open('TIX ajoutés avec succès !', 'OK', { duration: 3000 });
      this.resetTixForm();
    } catch (e) {
      this.snackBar.open('Erreur lors de l\'ajout des TIX', 'Fermer', { duration: 5000 });
    }
    this.loading = false;
  }

  async onRemoveTix() {
    this.loading = true;
    try {
      const amountToRemove = -Math.abs(this.tixData.amount);
      await this.dataService.addTixEntry(
        this.tixData.firstName,
        this.tixData.lastName,
        amountToRemove,
        this.tixData.date,
        this.tixData.eventName || 'Achat / Dépense'
      );
      this.snackBar.open('TIX retirés avec succès !', 'OK', { duration: 3000 });
      this.resetTixForm();
    } catch (e) {
      this.snackBar.open('Erreur lors du retrait des TIX', 'Fermer', { duration: 5000 });
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
      this.snackBar.open('Points Master ajoutés avec succès !', 'OK', { duration: 3000 });
      this.resetMasterForm();
    } catch (e) {
      this.snackBar.open('Erreur lors de l\'ajout des points Master', 'Fermer', { duration: 5000 });
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
      this.snackBar.open('Événement créé avec succès !', 'OK', { duration: 3000 });
      this.resetEventForm();
    } catch (e) {
      this.snackBar.open('Erreur lors de la création de l\'événement', 'Fermer', { duration: 5000 });
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
