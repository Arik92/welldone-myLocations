import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Category, CategoryService } from './category.service';

export interface Location {
  name: string,
  address: string,
  coordinates: {
    lat: number,
    lng: number
  },
  category: Category
};

export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  selectSubscription: BehaviorSubject<string> = new BehaviorSubject('');
  detailSubscription: BehaviorSubject<boolean> = new BehaviorSubject(false);
  locationList: Location[];

  constructor() {
    this.locationList = JSON.parse(localStorage.getItem('locations')) ? JSON.parse(localStorage.getItem('locations')) : [];
    //if no previous data exists, start out as an empty array
   }

  getAllLocations() {
    return this.locationList;
  }

  getLocationByName(locationName: string): Location {
    const res = this.locationList.filter(location => {
      return location.name.localeCompare(locationName) === 0;
    });
      return res[0];
  }
  
  updateAfterCategoryEdit(oldCategoryName: string, newCategoryName: string) {
    this.locationList.map(location => {
      if (location.category.name.localeCompare(oldCategoryName) === 0) {
        location.category.name = newCategoryName;
      }
    });
    localStorage.setItem('locations', JSON.stringify(this.locationList));    
  }

  updateAfterCategoryDeletion(categoryName: string) {
    this.locationList.map(location => {
      if (location.category.name.localeCompare(categoryName) === 0) {
        location.category.name += ' *deleted*';
      }
    })
    localStorage.setItem('locations', JSON.stringify(this.locationList));  
  }




  addLocation(newLocation: Location) {    

    this.locationList.push(newLocation);
    localStorage.setItem('locations', JSON.stringify(this.locationList));
  }

  editLocation(locationName: string, newLocation: Location) {
    for (let i = 0;i < this.locationList.length; i++) {
      if (this.locationList[i].name.localeCompare(locationName) === 0) { //Im using locationName as the index
        Object.assign(this.locationList[i], newLocation);
      }
    }      
    localStorage.setItem('locations', JSON.stringify(this.locationList));    
  }

  deleteLocation(locationName: string) {
    for (let i = 0;i < this.locationList.length; i++) {
      if (this.locationList[i].name.localeCompare(locationName) === 0) {
        this.locationList.splice(i, 1); // delete selected location
      }
    }      
    localStorage.setItem('locations', JSON.stringify(this.locationList));      
  } 

  toggleSelect(locationName: string) {
    this.selectSubscription.next(locationName);
  }

  toggleDetails(newState: boolean) {
    this.detailSubscription.next(newState);
  }

}
