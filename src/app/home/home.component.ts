import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SupabaseService } from '../core/supabase.service';
import { DataService } from '../data-model/data/data.service';
import { Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm-dialog.component';
import { EventDialogComponent } from '../shared/dialogs/event-dialog.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  logo = 'assets/img/mcb_logo.png';
  discordLogo = 'assets/img/discord_logo.png';
  xlogo = 'assets/img/logo_x.png';
  instalogo = 'assets/img/logo-instagram-png.png';

  // Variables for managing the popup
  showPopup = false;
  eventToEdit: any = null;
  editedTitle: string = '';
  editedDescription: string = '';
  editedImage: string = ''; // Image URL
  uploadedImage: File | null = null; // Image file
  isEditing: boolean = false; 
  reservationComment: string = '';
  resFirstName: string = '';
  resLastName: string = '';
  resEatOnSite: boolean = false;
  isAdmin: boolean = false;
  currentUser$: Observable<User | null>;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    events: [],
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),
  };

  constructor(
    private supabase: SupabaseService, 
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.currentUser$ = this.supabase.currentUser$;
    this.supabase.profile$.subscribe(profile => {
      if (profile) {
        this.resFirstName = profile.first_name || '';
        this.resLastName = profile.last_name || '';
      }
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.checkAdmin();
  }

  async checkAdmin() {
    this.isAdmin = await this.supabase.isAdmin();
  }

  async loadEvents() {
    const { data } = await this.dataService.getEvents();
    if (data) {
      this.calendarOptions.events = data.map(e => ({
        id: e.id,
        title: e.title,
        start: e.event_date,
        description: e.description,
        extendedProps: {
          image: e.image_url
        }
      }));
    }
  }

ngAfterViewInit(): void {
  this.loadElfsightScript();
}

loadElfsightScript(): void {
  const scriptId = 'elfsight-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }
}



  async handleDateClick(info: any) {
    if (!this.isAdmin) return;

    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: { dateStr: info.dateStr },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result && result.title) {
        const { error } = await this.dataService.createEvent(
          result.title, 
          info.dateStr, 
          result.description || '', 
          result.image || ''
        );

        if (!error) {
          this.snackBar.open('Événement créé avec succès !', 'OK', { duration: 3000 });
          this.loadEvents();
        } else {
          this.snackBar.open("Erreur lors de la création de l'événement", 'Fermer', { duration: 5000 });
        }
      }
    });
  }

  handleEventClick(info: any): void {
    // Store the event to be edited and show the popup
    this.eventToEdit = info.event;
    
    // Display the current event data in the popup
    this.editedTitle = this.eventToEdit.title;
    this.editedDescription = this.eventToEdit.extendedProps.description || '';
    this.editedImage = this.eventToEdit.extendedProps.image || ''; 

    // Show the popup
    this.showPopup = true;
    this.isEditing = false; // Reset the edit mode
}
  async deleteEvent() {
    if (this.eventToEdit && this.isAdmin) {
      const eventTitle = this.eventToEdit.title;
      
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Suppression Événement',
          message: `Voulez-vous vraiment supprimer l'événement "${eventTitle}" ?`,
          confirmText: 'Supprimer'
        }
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          const { error } = await this.dataService.deleteEvent(this.eventToEdit.id);
          if (!error) {
            this.snackBar.open('Événement supprimé.', 'OK', { duration: 3000 });
            this.loadEvents();
            this.showPopup = false;
          } else {
            this.snackBar.open('Erreur lors de la suppression.', 'Fermer', { duration: 5000 });
          }
        }
      });
    }
  }

  async onReserve() {
    if (this.eventToEdit) {
      if (!this.resFirstName || !this.resLastName) {
        this.snackBar.open('Le Nom et le Prénom sont obligatoires pour la réservation.', 'Fermer', { duration: 4000 });
        return;
      }

      try {
        const { error } = await this.dataService.makeReservation(
          this.eventToEdit.id, 
          this.reservationComment,
          this.resFirstName,
          this.resLastName,
          this.resEatOnSite
        );
        if (error) throw error;
        
        // --- Intégration EmailJS ---
        try {
          await emailjs.send(
            'service_m3jd5oy',
            'template_dsbwe8f',
            {
              event_name: this.eventToEdit.title,
              to_name: this.resFirstName + ' ' + this.resLastName,
              message: this.reservationComment || 'Aucun commentaire',
              eat_on_site: this.resEatOnSite ? 'Oui' : 'Non'
            },
            'zhMmNh2sxqyqiig2z'
          );
        } catch (emailErr) {
          console.error('Erreur lors de l\'envoi de l\'email: ', emailErr);
        }
        // ---------------------------

        this.snackBar.open('Réservation réussie !', 'OK', { duration: 3000 });
        this.showPopup = false;
        this.reservationComment = '';
        this.resEatOnSite = false;
      } catch (e: any) {
        this.snackBar.open('Erreur : Impossible de réserver. Vous avez peut-être déjà une réservation pour cet événement.', 'Fermer', { duration: 5000 });
      }
    }
  }

  closePopup(): void {
    this.showPopup = false;  
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedImage = e.target.result;
      };
      reader.readAsDataURL(file);  
    }
  }

  goDiscord(){
    window.open("https://discord.gg/2wxRaB5aK2", "_blank");
}
  goTwitter(){
    window.open("https://twitter.com/MCB_legacy31", "_blank");
}
  goInstagram(){
    window.open("https://www.instagram.com/magicclubbessieres", "_blank");
  }
}
