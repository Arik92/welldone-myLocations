import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MouseEvent } from '@agm/core';

import { LocationService, Location, marker } from '../location.service';
import { CategoryService, Category } from '../category.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent implements OnInit {
  locationForm: FormGroup;
  locationParam: string;
  originalLocation: Location;
  newLocation: Location;
  categoryList: Category[];
  mapLat: number = 51.673858;
  mapLng: number = 7.815982;
  selectedLat: number = this.mapLat;
  selectedLng: number = this.mapLng;
    
  zoom: number = 8;
  originalMarker: marker = {
    lat: this.mapLat,
    lng: this.mapLng,
    label: 'Original Location',
    draggable: false    
  };  
  newMarker: marker = {
    lat: this.mapLat,
    lng: this.mapLng,
    label: 'New Location',
    draggable: true    
  };

  constructor(private router: Router, private locationService: LocationService, private categoryService: CategoryService, private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.categoryList = this.categoryService.getAllCategories(); 

    this.route.params.subscribe(params => {
      this.locationParam = params.name;
      this.originalLocation = this.locationService.getLocationByName(this.locationParam);
      this.originalMarker.lat = this.originalLocation.coordinates.lat;
      this.originalMarker.lng = this.originalLocation.coordinates.lng;
      this.newMarker.lat = this.originalMarker.lat - 0.4;
      this.newMarker.lng = this.originalMarker.lng - 0.4;

      this.newLocation = {
        name: this.originalLocation.name,
        address: this.originalLocation.address,
        coordinates: {
          lat: this.originalLocation.coordinates.lat,
          lng: this.originalLocation.coordinates.lng,
        },
        category: this.originalLocation.category
      };

      this.locationForm = this.fb.group({
        categoryControl: [this.originalLocation.category.name],
        nameControl: [this.newLocation.name],
        addressControl: [this.newLocation.address]
      })

    });
  }

  markerDragEnd(event: MouseEvent) {
    this.newLocation.coordinates.lat = event.coords.lat;    
    this.newLocation.coordinates.lng = event.coords.lng;
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
  
  editLocation(form: NgForm) {    
    this.newLocation.name = form.value.nameControl;
    this.newLocation.address = form.value.addressControl;
    const foundCategory = this.categoryService.getCategoryByName(form.value.categoryControl);
    const msg = this.validateInput(this.newLocation.name, this.newLocation.address, foundCategory);    
    if (msg.localeCompare('valid') === 0) {
      this.newLocation.category = foundCategory;      
      this.locationService.editLocation(this.originalLocation.name, this.newLocation);
      this.router.navigate(['../all-locations']);
    } else {
      alert(msg);
    }
  }
}
