import { Component, OnInit } from '@angular/core';
import { ModeService, modeType } from '../mode.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  toolbarMode: modeType;

  constructor(private mode: ModeService) {    
    this.mode.modeSubscription.subscribe((newMode: modeType) => {
      this.toolbarMode = newMode;
    });
   }

  ngOnInit() {
  }

}
