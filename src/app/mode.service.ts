import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

export type modeType = 'categories' | 'locations';
@Injectable({
  providedIn: 'root'
})

export class ModeService {
  currentMode: modeType = 'categories';
  modeSubscription: BehaviorSubject<string> = new BehaviorSubject('');
  locationPatt;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {        
        if ((event.url.includes('all-locations'))||(event.url.includes('edit-location'))||(event.url.includes('new-location'))) {
          this.setCurrentMode('locations');
        } else {
          this.setCurrentMode('categories');
        }
      }
    });
   }
  getCurrentMode() {
    return this.currentMode;
  }

  setCurrentMode(newMode) {
    this.currentMode = newMode;
    this.modeSubscription.next(this.currentMode);
  }
}
