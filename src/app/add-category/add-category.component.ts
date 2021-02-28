import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private router: Router, private data: DataService) { }

  ngOnInit() {
  }

  validateCategoryName(name: string): string {
    const patt = new RegExp('[^ a-zA-Z0-9]'); // any character that is not a letter, a number or a whitespace. can be modified
    let msg = 'valid';
    
    if (name.localeCompare('') === 0) {
      msg = 'Please Enter A Category Name';
    } else if (patt.test(name)) {
      msg = 'Please Enter English characters and numbers only!';
    }
    return msg;
  }

  addCategory(form: NgForm) {
    const name = form.value.categoryName;
    const msg = this.validateCategoryName(name);
    if (msg.localeCompare('valid') === 0) {
      this.data.addCategory(name);
      this.router.navigate(['../all-categories']);
    } else {
      alert(msg);
    }
  }

}
