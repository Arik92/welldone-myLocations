import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';

import { LocationService, Location, marker } from '../location.service';
import { CategoryService, Category } from '../category.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
  categoryList: Category[];
  mapLat: number = 51.673858;
  mapLng: number = 7.815982;
  selectedLat: number = this.mapLat;
  selectedLng: number = this.mapLng;
    
  zoom: number = 8;
  marker: marker = {
    lat: this.mapLat,
    lng: this.mapLng,
    label: 'Location',
    draggable: true    
  }
  constructor(private router: Router, private locationService: LocationService, private categoryService: CategoryService) { }
  

  
  ngOnInit() {
    this.categoryList = this.categoryService.getAllCategories();    
  }

  markerDragEnd(event: MouseEvent) {
    this.selectedLat = event.coords.lat;    
    this.selectedLng = event.coords.lng;
  }

  validateTextField(fieldName: string, value: string): string {
    const patt = new RegExp('[^ a-zA-Z0-9]'); // any character that is not a letter, a number or a whitespace. can be modified
    let msg = 'valid';
    
    if (value.localeCompare('') === 0) {
      msg = 'Please Enter A ' + fieldName;
    } else if (patt.test(value)) {
      msg = 'Please Enter English characters And Numbers Only for ' + fieldName + '!';
    } 
    return msg;
  }

  validateInput(name: string, address: string, category): string {
    let validationMsg = 'valid';
    const nameMsg = this.validateTextField('Location Name', name);
    const addressMsg = this.validateTextField('Location Address', address);

    if (nameMsg.localeCompare('valid') !== 0) {
      validationMsg = nameMsg;
    } else if (addressMsg.localeCompare('valid') !== 0) {
      validationMsg = addressMsg;
    } else if (!category) {
      validationMsg = "Please choose A Category";
    }

    return validationMsg;
  }
  
  addLocation(form: NgForm) {    
    const foundCategory = this.categoryService.getCategoryByName(form.value.category);
    const msg = this.validateInput(form.value.locationName, form.value.locationAddress, foundCategory);    
    if (msg.localeCompare('valid') === 0) {
      const locationObj: Location = {
        name: form.value.locationName,
        address: form.value.locationAddress,
        coordinates: {
          lat: this.selectedLat,
          lng: this.selectedLng
        },
        category: foundCategory
      };

      this.locationService.addLocation(locationObj);
      this.router.navigate(['../all-locations']);
    } else {
      alert(msg);
    }
  }


}
