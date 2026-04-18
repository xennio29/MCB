import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SupabaseService } from '../core/supabase.service';
import { DataService } from '../data-model/data/data.service';
import { Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';


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

  constructor(private supabase: SupabaseService, private dataService: DataService) {
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

    let eventTitle = prompt("Nom de l'événement :");
    if (eventTitle) {
      let eventDescription = prompt("Description :");
      const imageFile = prompt("URL Image (optionnel) :");

      const { error } = await this.dataService.createEvent(
        eventTitle, 
        info.dateStr, 
        eventDescription || '', 
        imageFile || ''
      );

      if (!error) {
        this.loadEvents();
      } else {
        alert("Erreur lors de la création de l'événement");
      }
    }
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
      const deleteEvent = confirm(`Voulez-vous vraiment supprimer l'événement "${eventTitle}" ?`);
      if (deleteEvent) {
        const { error } = await this.dataService.deleteEvent(this.eventToEdit.id);
        if (!error) {
          this.loadEvents();
          this.showPopup = false;
        }
      }
    }
  }

  async onReserve() {
    if (this.eventToEdit) {
      if (!this.resFirstName || !this.resLastName) {
        alert('Le Nom et le Prénom sont obligatoires pour la réservation.');
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
        alert('Réservation réussie !');
        this.showPopup = false;
        this.reservationComment = '';
        this.resEatOnSite = false;
      } catch (e: any) {
        alert('Erreur : ' + (e.message || 'Impossible de réserver. Vous avez peut-être déjà une réservation pour cet événement.'));
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
