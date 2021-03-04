import { Component, OnInit } from '@angular/core';
import { LocationService, Location } from '../location.service';
import { CategoryService, Category } from '../category.service';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  locationList: Location[] = [];
  categoryList: Category[] = [];
  selectedFilterCategory: string;
  resetFilterFlag: boolean = false;
  emptyFilterFlag: boolean = false;
  selectedName: string = '';
  showDetails: boolean = false;
  zoom: number = 8;


  constructor(private locationService: LocationService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.locationList = this.locationService.getAllLocations();
    this.categoryList = this.categoryService.getAllCategories();
    this.locationService.detailSubscription.subscribe(detailFlag => {
      this.showDetails = detailFlag;
    });
  }

  isCurrentlySelected(index: number): boolean {
    return this.locationList[index].name === this.selectedName;
  }

  showDetailDrawer(index: number): boolean {
    return (this.isCurrentlySelected(index) && (this.showDetails));
  }

  selectItem(index: number) {
    this.selectedName = this.locationList[index].name;
    this.locationService.toggleDetails(false);
    this.locationService.toggleSelect(this.selectedName);
  }

  sortAlphabetically() {
    this.locationList.sort((a, b) => a.name.localeCompare(b.name));
  }
  sortByCategory() {
    this.locationList.sort((a, b) => a.category.name.localeCompare(b.category.name));
  }
  filterByCategory() {
    this.selectedName = '';
    this.locationService.toggleDetails(false);
    this.locationService.toggleSelect('');
    const categoryName = this.selectedFilterCategory;
    const allLocationsList = this.locationService.getAllLocations();
    if (categoryName && categoryName.localeCompare('*all*') === 0) {
      this.locationList = allLocationsList;
    } else {
      this.locationList = allLocationsList.filter(location => location.category.name.localeCompare(categoryName) === 0);
      if (this.locationList.length === 0) {
        this.resetFilterFlag = true;
      }
    }
  }

  resetFilters() {
    this.locationList = this.locationService.getAllLocations();
    this.resetFilterFlag = false;
  }

}
