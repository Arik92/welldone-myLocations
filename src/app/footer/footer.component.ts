import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ModeService, modeType} from '../mode.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  possibleModes: modeType[] = ['categories', 'locations'];
  currentMode: modeType = this.possibleModes[0];
  
  constructor(private router: Router,private mode: ModeService) {
    this.mode.modeSubscription.subscribe((newMode: modeType) => {
      this.currentMode = newMode;
    })
   }

  ngOnInit() {
  }

  isCurrentlySelected(mode: modeType): boolean {
    return (this.currentMode.localeCompare(mode) === 0);
  }
  
  selectMode(newMode: modeType) {    
    this.currentMode = newMode;
    this.mode.setCurrentMode(newMode);    
    const newRoute = this.currentMode.localeCompare(this.possibleModes[0]) === 0 ? '../all-categories' : '../all-locations';
    this.router.navigate([newRoute]);

  }

}
