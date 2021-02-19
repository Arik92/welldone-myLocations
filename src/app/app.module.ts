import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DynamicTitleComponent } from './dynamic-title/dynamic-title.component';
import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    DynamicTitleComponent,
    ToolbarActionsComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
