import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Category {
  name: string  
};

export interface Location {
  name: string,
  address: string,
  coordinates: number[],
  category: Category
};

@Injectable({
  providedIn: 'root'
})


export class DataService {
  selectSubscription: BehaviorSubject<string> = new BehaviorSubject('');
  detailSubscription: BehaviorSubject<boolean> = new BehaviorSubject(false);

  categoryList: Category[];

  constructor() {
    this.categoryList = JSON.parse(localStorage.getItem('categories')) ? JSON.parse(localStorage.getItem('categories')) : [];
    //if no previous data exists, start out as an empty array
   }

  getAllCategories() {
    return this.categoryList;
  }


  addCategory(categoryName: string) {
    const newCategory: Category = {
      name: categoryName
    }
    this.categoryList.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(this.categoryList));
  }

  editCategory(categoryName: string, newCategoryName: string) {
    for (let i = 0;i < this.categoryList.length; i++) {
      if (this.categoryList[i].name.localeCompare(categoryName) === 0) {
        this.categoryList[i].name = newCategoryName; // modify selected category
      }
    }      
    localStorage.setItem('categories', JSON.stringify(this.categoryList));    
  }

  deleteCategory(categoryName: string) {
    for (let i = 0;i < this.categoryList.length; i++) {
      if (this.categoryList[i].name.localeCompare(categoryName) === 0) {
        this.categoryList.splice(i, 1); // delete selected category
      }
    }      
    localStorage.setItem('categories', JSON.stringify(this.categoryList));      
  } 

  toggleSelect(categoryName: string) {
    this.selectSubscription.next(categoryName);
  }

  toggleDetails(newState: boolean){
    this.detailSubscription.next(newState);
  }

}
