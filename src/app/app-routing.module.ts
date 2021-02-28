import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

const routes: Routes = [
  { path: '', redirectTo: '/all-categories', pathMatch: 'full' },
  { path: 'all-categories', component: CategoryListComponent },
  { path: 'new-category', component: AddCategoryComponent },
  { path: 'edit-category/:name', component: EditCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
