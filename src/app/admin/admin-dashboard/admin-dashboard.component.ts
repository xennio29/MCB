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
    date: new Date(),
    eventName: ''
  };

  selectedTixPlayers: Player[] = [];
  selectedMasterPlayers: Player[] = [];

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

  onTixPlayerSelected(player: Player) {
    if (!this.selectedTixPlayers.find(p => p.fullName === player.fullName)) {
      this.selectedTixPlayers.push({
        firstName: player.firstName,
        lastName: player.lastName,
        fullName: player.fullName
      });
    }
    this.playerSearchControl.setValue('');
  }

  addManualTixPlayer() {
    if (this.tixData.firstName && this.tixData.lastName) {
      this.selectedTixPlayers.push({
        firstName: this.tixData.firstName,
        lastName: this.tixData.lastName,
        fullName: `${this.tixData.firstName} ${this.tixData.lastName}`
      });
      this.tixData.firstName = '';
      this.tixData.lastName = '';
    }
  }

  removeTixPlayer(player: Player) {
    this.selectedTixPlayers = this.selectedTixPlayers.filter(p => p !== player);
  }

  onMasterPlayerSelected(player: Player) {
    if (!this.selectedMasterPlayers.find(p => p.fullName === player.fullName)) {
      this.selectedMasterPlayers.push({
        firstName: player.firstName,
        lastName: player.lastName,
        fullName: player.fullName
      });
    }
    this.playerSearchControl.setValue('');
  }

  addManualMasterPlayer() {
    if (this.masterData.firstName && this.masterData.lastName) {
      this.selectedMasterPlayers.push({
        firstName: this.masterData.firstName,
        lastName: this.masterData.lastName,
        fullName: `${this.masterData.firstName} ${this.masterData.lastName}`
      });
      this.masterData.firstName = '';
      this.masterData.lastName = '';
    }
  }

  removeMasterPlayer(player: Player) {
    this.selectedMasterPlayers = this.selectedMasterPlayers.filter(p => p !== player);
  }

  selectedPlayerTixHistory: any[] = [];
  selectedPlayerMasterHistory: any[] = [];

  onPlayerSelectedForManage(player: Player) {
    this.selectedPlayerForManage = player;
    this.loadPlayerHistory();
    this.playerManageControl.setValue('');
  }

  loadPlayerHistory() {
    if (!this.selectedPlayerForManage) return;
    const tixSub = this.dataService.tixProfilEmitter.subscribe(profils => {
      const profil = profils.find(p => p.fullName.toLowerCase() === this.selectedPlayerForManage!.fullName.toLowerCase());
      this.selectedPlayerTixHistory = profil ? profil.tixChanges : [];
    });
    const masterSub = this.dataService.masterProfilEmitter.subscribe(profils => {
      const profil = profils.find(p => p.fullName.toLowerCase() === this.selectedPlayerForManage!.fullName.toLowerCase());
      this.selectedPlayerMasterHistory = profil ? profil.masterChanges : [];
    });
    tixSub.unsubscribe();
    masterSub.unsubscribe();
  }

  async onDeleteTixEntry(id: string) {
    if (!id) {
       this.snackBar.open('Impossible de supprimer cette ligne (ID manquant)', 'Fermer', { duration: 3000 });
       return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Suppression', message: 'Supprimer cette ligne TIX ?', confirmText: 'Supprimer' }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.loading = true;
        const { error } = await this.dataService.deleteTixEntryById(id);
        if (!error) {
          this.snackBar.open('Ligne supprimée', 'OK', { duration: 3000 });
          this.loadPlayerHistory();
        }
        this.loading = false;
      }
    });
  }

  async onDeleteMasterEntry(id: string) {
    if (!id) {
       this.snackBar.open('Impossible de supprimer cette ligne (ID manquant)', 'Fermer', { duration: 3000 });
       return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Suppression', message: 'Supprimer cette ligne Master ?', confirmText: 'Supprimer' }
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.loading = true;
        const { error } = await this.dataService.deleteMasterEntryById(id);
        if (!error) {
          this.snackBar.open('Ligne supprimée', 'OK', { duration: 3000 });
          this.loadPlayerHistory();
        }
        this.loading = false;
      }
    });
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
    if (this.selectedTixPlayers.length === 0) {
      this.snackBar.open('Veuillez ajouter au moins un joueur', 'Fermer', { duration: 3000 });
      return;
    }
    this.loading = true;
    try {
      for (const player of this.selectedTixPlayers) {
        const { error } = await this.dataService.addTixEntry(
          player.firstName,
          player.lastName,
          this.tixData.amount,
          this.tixData.date,
          this.tixData.eventName
        );
        if (error) {
          console.error("Error adding TIX:", error);
          throw error;
        }
      }
      this.snackBar.open('TIX ajoutés avec succès !', 'OK', { duration: 3000 });
      this.resetTixForm();
    } catch (e) {
      this.snackBar.open('Erreur lors de l\'ajout des TIX', 'Fermer', { duration: 5000 });
    }
    this.loading = false;
  }

  async onRemoveTix() {
    if (this.selectedTixPlayers.length === 0) {
      this.snackBar.open('Veuillez ajouter au moins un joueur', 'Fermer', { duration: 3000 });
      return;
    }
    this.loading = true;
    try {
      const amountToRemove = -Math.abs(this.tixData.amount);
      for (const player of this.selectedTixPlayers) {
        const { error } = await this.dataService.addTixEntry(
          player.firstName,
          player.lastName,
          amountToRemove,
          this.tixData.date,
          this.tixData.eventName || 'Achat / Dépense'
        );
        if (error) {
          console.error("Error removing TIX:", error);
          throw error;
        }
      }
      this.snackBar.open('TIX retirés avec succès !', 'OK', { duration: 3000 });
      this.resetTixForm();
    } catch (e) {
      this.snackBar.open('Erreur lors du retrait des TIX', 'Fermer', { duration: 5000 });
    }
    this.loading = false;
  }

  async onAddMaster() {
    if (this.selectedMasterPlayers.length === 0) {
      this.snackBar.open('Veuillez ajouter au moins un joueur', 'Fermer', { duration: 3000 });
      return;
    }
    this.loading = true;
    try {
      for (const player of this.selectedMasterPlayers) {
        const { error } = await this.dataService.addMasterEntry(
          player.firstName,
          player.lastName,
          this.masterData.points,
          this.masterData.date,
          this.masterData.eventName || 'Event'
        );
        if (error) {
          console.error("Error adding Master points:", error);
          throw error;
        }
      }
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
    this.selectedTixPlayers = [];
  }

  private resetMasterForm() {
    this.masterData = { firstName: '', lastName: '', points: 0, date: new Date(), eventName: '' };
    this.selectedMasterPlayers = [];
  }

  private resetEventForm() {
    this.eventData = { title: '', description: '', date: new Date(), image: '' };
  }
}
