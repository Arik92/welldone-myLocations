import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { CategoryService } from '../category.service';
import { LocationService } from '../location.service';
import { ModeService, modeType } from '../mode.service';

@Component({
  selector: 'app-toolbar-actions',
  templateUrl: './toolbar-actions.component.html',
  styleUrls: ['./toolbar-actions.component.scss']
})
export class ToolbarActionsComponent implements OnInit {
  isItemSelected: boolean = false; // if true - shows 'edit', 'delete', 'view details' actions.
  isFormPage: boolean = false; // if true - shows 'categories list'. Otherwise 'new category'
  selectedItem: string = '';
  currentMode: modeType;

  actionObj = {
    'delete': false,
    'edit': false,
    'view details': false,
    'categories list': false,
    'new category': false,
    'locations list': false,
    'new location': false
  };
  displayedActions = [];

  constructor(private router: Router, private categoryService: CategoryService, private locationService: LocationService, private modeService: ModeService) {
    this.modeService.modeSubscription.subscribe((newMode: modeType) => {
      this.currentMode = newMode;
      this.updateActionsDisplay();
    });

    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {        
        if (event.url && this.isFormURL(event.url)) {
        this.isFormPage = true;
        this.isItemSelected = false;
        } else if (event.url && this.isListURL(event.url)) {
          this.isFormPage = false;
          this.isItemSelected = false;
        }
        this.updateActionsDisplay();
      }     
    });
    this.categoryService.selectSubscription.subscribe((selected:string) => {
      if (selected.localeCompare('') !== 0) {
        this.selectedItem = selected;
        this.isItemSelected = true;
      } else {
        this.isItemSelected = false;
      }
      this.updateActionsDisplay();
    });

    this.locationService.selectSubscription.subscribe((selected:string) => {
      if (selected.localeCompare('') !== 0) {
        this.selectedItem = selected; //another one for location. with tracking by location.name
        this.isItemSelected = true;
      } else {
        this.isItemSelected = false;
      }
      this.updateActionsDisplay();
    });

   }

  ngOnInit() {
    
  }
  isFormURL(url: string): boolean {
    return ((url.includes('/new-category')) || (url.includes('/edit-category')) || (url.includes('/new-location')) || (url.includes('/edit-location')));
  }

  isListURL(url: string): boolean {
    return ((url.includes('/all-categories')) || (url.includes('/all-locations')));
  }

  handleAction(actionName: string) {
    switch (actionName) {
      case 'delete':
        this.deleteItem();
        break;
      case 'edit':
        this.editItem();        
        break;
        case 'view details':
          this.toggleItemDetails();
        break;
      case 'new category':
      case 'new location':
        this.newItemForm();
        break;      
      case 'categories list': 
      case 'locations list':
        this.returnToList();
        break;
      default: break;  
    }

  }

  updateActionsDisplay() {   
    const isCategoryMode = this.currentMode.localeCompare('categories') === 0;
    this.actionObj['edit'] = this.isItemSelected;
    this.actionObj['delete'] = this.isItemSelected;
    this.actionObj['view details'] = this.isItemSelected;
    this.actionObj['new category'] = (!this.isItemSelected && !this.isFormPage && isCategoryMode);
    this.actionObj['new location'] = (!this.isItemSelected && !this.isFormPage && !isCategoryMode);
    this.actionObj['categories list'] = this.isFormPage && isCategoryMode;        
    this.actionObj['locations list'] = this.isFormPage && !isCategoryMode;   

    const actionArr = Object.entries(this.actionObj);
    this.displayedActions = [];
    for (let i = 0;i < actionArr.length; i++) { // display only actions with 'true' value
      if (actionArr[i][1]) {
        this.displayedActions.push(actionArr[i][0]);
      }
    }    
  }  

  newItemForm() {
    if (this.currentMode.localeCompare('categories') === 0) {      
      this.router.navigate(['/new-category']);
    } else {
      this.router.navigate(['/new-location']);
    }
    this.isFormPage = true;
  }
  returnToList() {
    if (this.currentMode.localeCompare('categories') === 0) {      
      this.router.navigate(['/all-categories']);
    } else {
      this.router.navigate(['/all-locations']);
    }  
  }

  editItem() {
    if (this.currentMode.localeCompare('categories') === 0) {      
      this.router.navigate(['/edit-category/' + this.selectedItem]);
    } else {
      this.router.navigate(['/edit-location/' + this.selectedItem]);
    }
    this.isFormPage = true;
    this.isItemSelected = false;
    // this.categoryService.toggleDetails(false); TODO
  }

  deleteItem() {
    if (this.currentMode.localeCompare('categories') === 0) {
      this.categoryService.deleteCategory(this.selectedItem);
      this.locationService.updateAfterCategoryDeletion(this.selectedItem);
    } else {
      this.locationService.deleteLocation(this.selectedItem);
    }
    this.isItemSelected = false;
    this.updateActionsDisplay();
  }
  
  toggleItemDetails()  {
    if (this.currentMode.localeCompare('categories') === 0) {
      this.categoryService.toggleDetails(true);
    } else {
      this.locationService.toggleDetails(true);
    }
  }
}
