import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[] = [];
  selectedName: string = '';
  showDetails: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryList = this.categoryService.getAllCategories();
    this.categoryService.detailSubscription.subscribe(detailFlag => {
      this.showDetails = detailFlag;
    });
  }

  isCurrentlySelected(index: number): boolean {
    return this.categoryList[index].name === this.selectedName;
  }

  showDetailDrawer(index: number): boolean {
    return (this.isCurrentlySelected(index) &&(this.showDetails));
  }
  
  selectItem(index: number) {
    this.selectedName = this.categoryList[index].name;
    this.categoryService.toggleDetails(false);
    this.categoryService.toggleSelect(this.selectedName); // I want to reserve the option of un-selecting a category in the future
  }

}
