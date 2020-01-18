import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {UsersListComponent} from './users-list/users-list.component';
import {EditTaskComponent} from './edit-task/edit-task.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'add-task',component:AddTaskComponent},
  {path:'tasks-list',component:TasksListComponent},
  {path:'users-list',component:UsersListComponent},
  {path:'edit-task/:id',component:EditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
