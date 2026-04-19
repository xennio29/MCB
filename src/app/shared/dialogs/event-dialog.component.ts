import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface EventDialogData {
  dateStr: string;
}

export interface EventDialogResult {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-event-dialog',
  template: `
    <h2 mat-dialog-title class="mcb-title">Nouvel Événement</h2>
    <mat-dialog-content>
      <p style="color: #555; margin-bottom: 20px;">Création pour la date : {{ data.dateStr | date:'dd/MM/yyyy' }}</p>
      
      <div style="display: flex; flex-direction: column; gap: 15px;">
        <mat-form-field appearance="outline">
          <mat-label>Titre de l'événement</mat-label>
          <input matInput [(ngModel)]="result.title" required>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="result.description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>URL Image (Optionnel)</mat-label>
          <input matInput [(ngModel)]="result.image">
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end" style="margin-top: 15px;">
      <button mat-button (click)="onNoClick()" style="color: #666;">Annuler</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="result" [disabled]="!result.title">Créer l'événement</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      background: #ffffff; /* Light theme to match site */
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    ::ng-deep .mat-mdc-dialog-surface {
      background-color: #ffffff !important;
    }
    .mcb-title {
      font-family: 'Bebas Neue', cursive !important;
      letter-spacing: 1px;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #000 0%, #f90000 50%, #000 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: #f90000; /* Fallback */
    }
  `],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule]
})
export class EventDialogComponent {
  result: EventDialogResult = {
    title: '',
    description: '',
    image: ''
  };

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
