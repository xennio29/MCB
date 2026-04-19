import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { DataService } from '../data-model/data/data.service';
import { SupabaseService } from '../core/supabase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule]
})
export class ReportsComponent implements OnInit {
  logo = 'assets/img/mcb_logo.png';
  reports: any[] = [];
  loading = false;
  isAdmin = false;
  
  showFormPopup = false;
  showReportPopup = false;
  selectedReport: any = null;

  formData = {
    authorName: '',
    format: '',
    playersCount: 0,
    location: '',
    decklistUrl: '',
    content: ''
  };

  constructor(
    private dataService: DataService, 
    private supabase: SupabaseService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReports();
    this.supabase.profile$.subscribe(profile => {
      if (profile) {
        this.formData.authorName = `${profile.first_name} ${profile.last_name}`;
        this.isAdmin = profile.role === 'admin';
      } else {
        this.isAdmin = false;
      }
    });
  }

  async loadReports() {
    this.loading = true;
    const { data, error } = await this.dataService.getReports();
    if (!error && data) {
      this.reports = data;
    }
    this.loading = false;
  }

  openCreateForm() {
    this.showFormPopup = true;
  }

  closeForm() {
    this.showFormPopup = false;
    this.resetForm();
  }

  async submitReport() {
    if (!this.formData.authorName || !this.formData.format || !this.formData.location || !this.formData.content) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', { duration: 4000 });
      return;
    }

    this.loading = true;
    const { error } = await this.dataService.createReport(
      this.formData.authorName,
      this.formData.format,
      this.formData.playersCount,
      this.formData.location,
      this.formData.decklistUrl,
      this.formData.content
    );

    if (!error) {
      this.snackBar.open('Report publié avec succès !', 'OK', { duration: 3000 });
      this.closeForm();
      this.loadReports();
    } else {
      this.snackBar.open('Erreur lors de la publication du report.', 'Fermer', { duration: 5000 });
      console.error(error);
    }
    this.loading = false;
  }

  openReport(report: any) {
    this.selectedReport = report;
    this.showReportPopup = true;
  }

  closeReport() {
    this.showReportPopup = false;
    this.selectedReport = null;
  }

  async onDeleteReport(report: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Suppression du Report',
        message: `Voulez-vous vraiment supprimer le report de ${report.author_name} ?`,
        confirmText: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.loading = true;
        const { error } = await this.dataService.deleteReport(report.id);
        if (!error) {
          this.snackBar.open('Report supprimé avec succès.', 'OK', { duration: 3000 });
          this.closeReport();
          this.loadReports();
        } else {
          this.snackBar.open('Erreur lors de la suppression du report.', 'Fermer', { duration: 5000 });
          console.error(error);
        }
        this.loading = false;
      }
    });
  }

  private resetForm() {
    const author = this.formData.authorName; // Garder l'auteur
    this.formData = {
      authorName: author,
      format: '',
      playersCount: 0,
      location: '',
      decklistUrl: '',
      content: ''
    };
  }
}
