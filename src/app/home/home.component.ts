import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getEvents } from './event';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    events: getEvents(),  
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  ngOnInit(): void {}

  handleDateClick(info: any): void {
    let eventTitle = prompt("Event name:");
    if (eventTitle) {
      let eventDescription = prompt("Event description:");
      const imageFile = prompt("Image URL (or leave empty):");

      info.view.calendar.addEvent({
        title: eventTitle,
        start: info.dateStr,
        description: eventDescription,
        extendedProps: {
          image: imageFile || ''
        }
      });
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
  deleteEvent(): void {
    if (this.eventToEdit) {
      const eventTitle = this.eventToEdit.title;
      const deleteEvent = confirm(`Are you sure you want to delete the event "${eventTitle}"?`);
      if (deleteEvent) {
        this.eventToEdit.remove();  // Delete the event
        alert(`The event "${eventTitle}" has been deleted.`);
        this.showPopup = false;  // Hide the popup after deletion
        this.eventToEdit = null;  // Reset the event to delete
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
