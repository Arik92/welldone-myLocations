import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-dynamic-title',
  templateUrl: './dynamic-title.component.html',
  styleUrls: ['./dynamic-title.component.scss']
})
export class DynamicTitleComponent implements OnInit {
  title: string = 'Title';
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {                 
        this.title = event.url.replace('/', '').replace('-', ' ').replace('/', ': ');        
        if (this.title === '') {
          this.title = 'All Categories'; // Edge case - base href redirection
        }
      }     
    });
   }
  

  ngOnInit() {    
  }

}
