import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent,SelectUserDialog } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksListComponent,DeleteDialog } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UsersListComponent,AddUserDialog } from './users-list/users-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

import {ApiService} from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TasksListComponent,
    AddTaskComponent,
    UsersListComponent,
    SelectUserDialog,
    DeleteDialog,
    AddUserDialog,
    EditTaskComponent
  ],
  entryComponents: [SelectUserDialog,DeleteDialog,AddUserDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [ApiService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
