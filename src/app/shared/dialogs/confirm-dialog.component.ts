import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title class="mcb-title">{{ data.title }}</h2>
    <mat-dialog-content>
      <p style="color: #333;">{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()" style="color: #666;">{{ data.cancelText || 'Annuler' }}</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">{{ data.confirmText || 'Confirmer' }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .mcb-title {
      font-family: 'Bebas Neue', cursive !important;
      letter-spacing: 1px;
      margin: 0;
      background: linear-gradient(90deg, #000 0%, #f90000 50%, #000 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: #f90000; /* Fallback */
    }
  `],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
