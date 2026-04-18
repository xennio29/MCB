import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SupabaseService } from '../core/supabase.service';
import { Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';

@Component({
    selector: 'bc-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
    standalone: false
})
export class MenuBarComponent implements OnInit {

  whiteLogo = 'assets/img/mcb_logo.png';
  rootName = '';

  @Output() public sidenavToggle = new EventEmitter();
  
  currentUser$: Observable<User | null>;
  profile$: Observable<any | null>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private supabase: SupabaseService) {
    this.currentUser$ = this.supabase.currentUser$;
    this.profile$ = this.supabase.profile$;
  }

  ngOnInit(): void {

    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.rootName = this.getMenuName(event.urlAfterRedirects);
      }
    });
  }

  getMenuName(path: string): string {
    switch (path) {
      case '/home':
        return 'Home';
      case '/tixbank':
        return 'Vos Points TIX';
      case '/masters':
        return 'Classement des Masters';
      case '/proxies':
        return 'Proxies';
    }
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.supabase.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
