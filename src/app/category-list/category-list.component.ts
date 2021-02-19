import { Component, OnInit } from '@angular/core';
import { DataService, Category } from '../data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[] = []
  selectedName: string = '';
  showDetails: boolean = false;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.categoryList = this.data.getAllCategories();
    this.data.detailSubscription.subscribe(detailFlag => {
      this.showDetails = detailFlag;
    })
  }

  isCurrentlySelected(index: number): boolean {
    return this.categoryList[index].name === this.selectedName;
  }

  showDetailDrawer(index:number):boolean {
    return (this.isCurrentlySelected(index) &&(this.showDetails));
  }
  
  selectCategory(index: number) {
    this.selectedName = this.categoryList[index].name;
    this.data.toggleDetails(false);
    this.data.toggleSelect(this.selectedName); // I want to reserve the option of un-selecting a category in the future
  }

}
