import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {
  logo = 'assets/img/mcb_logo.png';
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onLogin() {
    this.loading = true;
    this.errorMessage = '';
    const { error } = await this.supabase.signIn(this.email, this.password);
    
    if (error) {
      this.errorMessage = error.message;
    } else {
      this.router.navigate(['/home']);
    }
    this.loading = false;
  }
}
