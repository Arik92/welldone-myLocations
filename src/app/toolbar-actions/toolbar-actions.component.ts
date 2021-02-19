import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-toolbar-actions',
  templateUrl: './toolbar-actions.component.html',
  styleUrls: ['./toolbar-actions.component.scss']
})
export class ToolbarActionsComponent implements OnInit {
  isCategorySelected: boolean = false; // if true - shows 'edit', 'delete', 'view details' actions.
  isFormPage: boolean = false; // if true - shows 'categories list'. Otherwise 'new category'
  selectedCategory: string = '';

  actionObj = {
    'delete': false,
    'edit': false,
    'view details': false,
    'categories list': true,
    'new category': false
  };
  displayedActions = [];

  constructor(private router: Router, private data: DataService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {        
        if (event.url && event.url.localeCompare('/new-category') === 0) {
        this.isFormPage = true;
        this.isCategorySelected = false;
        } else if (event.url && event.url.localeCompare('/categories') === 0) {
          this.isFormPage = false;
          this.isCategorySelected = false;
        }
        this.updateActionsDisplay();
      }     
    });
    this.data.selectSubscription.subscribe((selected:string) => {
      if (selected.localeCompare('') !== 0) {
        this.selectedCategory = selected;
        this.isCategorySelected = true;
      } else {
        this.isCategorySelected = false;
      }
      this.updateActionsDisplay();
    })
   }

  ngOnInit() {
    
  }

  handleAction(actionName: string) {
    switch (actionName) {
      case 'delete':
        this.data.deleteCategory(this.selectedCategory);
        this.isCategorySelected = false;
        this.updateActionsDisplay();
        break;
      case 'edit':
        this.isFormPage = true;
        this.isCategorySelected = false;
        this.data.toggleDetails(false);
        this.router.navigate(['/edit-category/' + this.selectedCategory]);
        break;
        case 'view details':
        this.data.toggleDetails(true);
        break;
      case 'new category':
        this.isFormPage = true;
        this.router.navigate(['/new-category']);
        break;      
      case 'categories list':
        this.router.navigate(['/categories']);
        break;
      default: break;  
    }

  }

  updateActionsDisplay() {   
    this.actionObj['edit'] = this.isCategorySelected;
    this.actionObj['delete'] = this.isCategorySelected;
    this.actionObj['view details'] = this.isCategorySelected;
    this.actionObj['new category'] = (!this.isCategorySelected && !this.isFormPage);
    this.actionObj['categories list'] = this.isFormPage;        

    const actionArr = Object.entries(this.actionObj);
    this.displayedActions = [];
    for (let i = 0;i < actionArr.length; i++) { // display only actions with 'true' value
      if (actionArr[i][1]) {
        this.displayedActions.push(actionArr[i][0]);
      }
    }
  }  
}
