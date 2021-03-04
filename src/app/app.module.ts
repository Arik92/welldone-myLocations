import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DynamicTitleComponent } from './dynamic-title/dynamic-title.component';
import { ToolbarActionsComponent } from './toolbar-actions/toolbar-actions.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FooterComponent } from './footer/footer.component';
import { LocationListComponent } from './location-list/location-list.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditLocationComponent } from './edit-location/edit-location.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    DynamicTitleComponent,
    ToolbarActionsComponent,
    EditCategoryComponent,
    FooterComponent,
    LocationListComponent,
    AddLocationComponent,
    EditLocationComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
