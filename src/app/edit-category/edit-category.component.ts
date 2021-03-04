import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  currentName: string = '';

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute,
    private locationService: LocationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentName = params.name;
    });
  }

  validateCategoryName(name: string): string {
    const patt = new RegExp('[^ a-zA-Z0-9]'); // any character that is not a letter, a number or a whitespace. can be modified
    let msg = 'valid';
    
    if (name.localeCompare('') === 0) {
      msg = 'Please Enter A Category Name';
    } else if (patt.test(name)) {
      msg = 'Please Enter English characters and numbers only!';
    } if (name.localeCompare(this.currentName) === 0) {
      msg = "Please Enter A Different Category Name. If you wish to leave the name unchanged, you can navigate back with 'Categories List'.";
    }
    return msg;
  }

  editCategory(form: NgForm) {
    const name = form.value.categoryName;
    const msg = this.validateCategoryName(name);
    if (msg.localeCompare('valid') === 0) {
      this.categoryService.editCategory(this.currentName, name);
      this.locationService.updateAfterCategoryEdit(this.currentName, name);
      this.router.navigate(['../all-categories']);
    } else {
      alert(msg);
    }
  }

}
