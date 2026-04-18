import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private _currentUser = new BehaviorSubject<User | null>(null);
  private _profile = new BehaviorSubject<any | null>(null);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    
    // Check initial session
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this._currentUser.next(session?.user ?? null);
      if (session?.user) {
        this.getProfile(session.user.id);
      }
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      this._currentUser.next(session?.user ?? null);
      if (session?.user) {
        this.getProfile(session.user.id);
      } else {
        this._profile.next(null);
      }
    });
  }

  get currentUser$(): Observable<User | null> {
    return this._currentUser.asObservable();
  }

  get profile$(): Observable<any | null> {
    return this._profile.asObservable();
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  async signUp(email: string, pass: string, firstName: string, lastName: string) {
    const { data, error } = await this.supabase.auth.signUp({ 
      email, 
      password: pass,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });
    return { data, error };
  }

  async signIn(email: string, pass: string) {
    return await this.supabase.auth.signInWithPassword({ email, password: pass });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  private async getProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      this._profile.next(data);
    }
  }

  async isAdmin(): Promise<boolean> {
    const profile = this._profile.value;
    if (profile) return profile.role === 'admin';
    
    const user = this._currentUser.value;
    if (!user) return false;

    const { data } = await this.supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    return data?.role === 'admin';
  }
}
