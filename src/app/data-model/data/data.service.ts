import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../../core/supabase.service';
import { MasterProfil, MasterChangeByEvent } from '../model/masterprofil';
import { TixProfil, TixChangeByEvent } from '../model/tixprofil';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public tixProfilEmitter: BehaviorSubject<TixProfil[]>;
  private _tixProfils: TixProfil[] = [];

  public masterProfilEmitter: BehaviorSubject<MasterProfil[]>;
  private _masterProfils: MasterProfil[] = [];

  private loaded = false;

  constructor(private supabase: SupabaseService) {
    this.tixProfilEmitter = new BehaviorSubject<TixProfil[]>([]);
    this.masterProfilEmitter = new BehaviorSubject<MasterProfil[]>([]);
  }

  getTixProfils() {
    this.askData(DataType.TIX_PROFIL);
    return this.tixProfilEmitter;
  }

  getMasterProfils() {
    this.askData(DataType.MASTER_PROFIL);
    return this.masterProfilEmitter;
  }

  async askData(...datasType: DataType[]) {
    if (!this.loaded) {
      await this.loadAllData();
      this.loaded = true;
    }
    this.emitData(...datasType);
  }

  private async loadAllData() {
    await Promise.all([
      this.fetchTixProfils(),
      this.fetchMasterProfils()
    ]);
  }

  private async fetchTixProfils() {
    const { data, error } = await this.supabase.client
      .from('tix_entries')
      .select('*');

    if (error) {
      console.error('Error fetching Tix entries:', error);
      return;
    }

    const profilsMap = new Map<string, TixProfil>();
    data.forEach(entry => {
      const key = `${entry.first_name}|${entry.last_name}`;
      const change = new TixChangeByEvent(new Date(entry.event_date), entry.event_name, entry.amount);
      
      if (profilsMap.has(key)) {
        profilsMap.get(key)!.tixChanges.push(change);
      } else {
        profilsMap.set(key, new TixProfil(entry.first_name, entry.last_name, [change]));
      }
    });

    this._tixProfils = Array.from(profilsMap.values());
  }

  private async fetchMasterProfils() {
    const { data, error } = await this.supabase.client
      .from('master_entries')
      .select('*');

    if (error) {
      console.error('Error fetching Master entries:', error);
      return;
    }

    const profilsMap = new Map<string, MasterProfil>();
    data.forEach(entry => {
      const key = `${entry.first_name}|${entry.last_name}`;
      const change = new MasterChangeByEvent(new Date(entry.event_date), 'Event', entry.points);
      
      if (profilsMap.has(key)) {
        profilsMap.get(key)!.masterChanges.push(change);
      } else {
        profilsMap.set(key, new MasterProfil(entry.first_name, entry.last_name, [change]));
      }
    });

    this._masterProfils = Array.from(profilsMap.values());
  }

  private emitData(...datasType: DataType[]) {
    datasType.forEach(dataType => {
      switch (dataType) {
        case DataType.TIX_PROFIL: 
          this.tixProfilEmitter.next(this._tixProfils);
          break;
        case DataType.MASTER_PROFIL: 
          this.masterProfilEmitter.next(this._masterProfils);
          break;
      }
    });
  }

  // Admin Methods
  async addTixEntry(firstName: string, lastName: string, amount: number, date: Date, eventName: string) {
    const { data, error } = await this.supabase.client
      .from('tix_entries')
      .insert([{ 
        first_name: firstName, 
        last_name: lastName, 
        amount: amount, 
        event_date: date.toISOString().split('T')[0], 
        event_name: eventName 
      }]);
    
    if (!error) {
      await this.fetchTixProfils();
      this.emitData(DataType.TIX_PROFIL);
    }
    return { data, error };
  }

  async addMasterEntry(firstName: string, lastName: string, points: number, date: Date) {
    const { data, error } = await this.supabase.client
      .from('master_entries')
      .insert([{ 
        first_name: firstName, 
        last_name: lastName, 
        points: points, 
        event_date: date.toISOString().split('T')[0]
      }]);
    
    if (!error) {
      await this.fetchMasterProfils();
      this.emitData(DataType.MASTER_PROFIL);
    }
    return { data, error };
  }

  async deletePlayerTix(firstName: string, lastName: string) {
    const { error } = await this.supabase.client
      .from('tix_entries')
      .delete()
      .eq('first_name', firstName)
      .eq('last_name', lastName);
    
    if (!error) {
      await this.fetchTixProfils();
      this.emitData(DataType.TIX_PROFIL);
    }
    return { error };
  }

  async deletePlayerMasters(firstName: string, lastName: string) {
    const { error } = await this.supabase.client
      .from('master_entries')
      .delete()
      .eq('first_name', firstName)
      .eq('last_name', lastName);
    
    if (!error) {
      await this.fetchMasterProfils();
      this.emitData(DataType.MASTER_PROFIL);
    }
    return { error };
  }

  // Event Methods
  async getEvents() {
    const { data, error } = await this.supabase.client
      .from('events')
      .select('*');
    return { data, error };
  }

  async createEvent(title: string, date: string, description: string, image: string) {
    const { data, error } = await this.supabase.client
      .from('events')
      .insert([{ title, event_date: date, description, image_url: image }]);
    return { data, error };
  }

  async deleteEvent(id: string) {
    return await this.supabase.client.from('events').delete().eq('id', id);
  }

  async makeReservation(eventId: string, comment: string, firstName: string, lastName: string, eatOnSite: boolean) {
    const userResult = await this.supabase.client.auth.getUser();
    const userId = userResult.data.user?.id;
    if (!userId) throw new Error('User not logged in');

    return await this.supabase.client
      .from('reservations')
      .insert([{ 
        event_id: eventId, 
        user_id: userId, 
        comment,
        player_first_name: firstName,
        player_last_name: lastName,
        eat_on_site: eatOnSite
      }]);
  }
}

export enum DataType {
  TIX_PROFIL,
  MASTER_PROFIL
}
