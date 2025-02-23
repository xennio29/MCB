import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logo = 'assets/img/mcb_logo.png';
  discordLogo = 'assets/img/discord_logo.png';
  xlogo = 'assets/img/logo_x.png';

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
    events: [
      {
        title: 'CR DC',
        start: '2025-02-15',
        description: 'Championnat régional de DC 2025',
        extendedProps: {
          image: 'assets/img/CRDC_2025.png' 
        },
        backgroundColor: 'red'
      },
      {
        title: 'MQL',
        start: '2025-03-15',
        description: 'Main Qualifier Legacy 2025',
        extendedProps: {
          image: 'assets/img/MQL_2025.png' 
        },
        backgroundColor: 'red'
      }
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
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

  goDiscord(): void {
    // Logic for navigating to Discord
  }
}
