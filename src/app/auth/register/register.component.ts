import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss'], // Reuse login styles
  standalone: false
})
export class RegisterComponent {
  logo = 'assets/img/mcb_logo.png';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onRegister() {
    this.loading = true;
    this.errorMessage = '';
    const { error } = await this.supabase.signUp(this.email, this.password, this.firstName, this.lastName);
    
    if (error) {
      this.errorMessage = error.message;
    } else {
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      this.router.navigate(['/login']);
    }
    this.loading = false;
  }
}
