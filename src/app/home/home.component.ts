import { Component, OnInit,Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ApiService } from '../services/api.service';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  task: Task;
  users: User[];
  selected: String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: Task[];
  users: User[];
  open: Task[] = [];
  inProgress: Task[] = [];
  completed: Task[] = [];
  archived: Task[] = [];
  task: Task;
  selected: string

  constructor(public api: ApiService,public dialog: MatDialog) { }

  openDialog(event: CdkDragDrop<Task[]>): void {
    const dialogRef = this.dialog.open(SelectUserDialog, {
      height: '200px',
      width: '600px',
      data: {task: this.task, users: this.users, selected: this.selected}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.selected = result;
      if(this.selected!=null){
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
          this.task.assignedTo = this.selected;
      }
    });
  }

  organizeTasks(){
    for(let task of this.tasks){
      switch(task.status){
        case 'Open':{
          this.open.push(task);
          break;
        }
        case 'In-Progress':{
          this.inProgress.push(task);
          break;
        }
        case 'Completed':{
          this.completed.push(task);
          break;
        }
        case 'Archived':{
          this.archived.push(task);
          break;
        }
      }
    }
  }

  async updateTask(id,task){
    console.log("Edit:")
    console.log(task);
    await this.api.editTask(id,task)
      .subscribe(res => {
        let id = res['_id'];
      }, (err) => {
        console.log(err);
      });
  }

  async getTasks() {
    await this.api.getAllTasks()
     .subscribe(res => {
        this.tasks = res;
        this.organizeTasks();
      }, err => {
        console.log(err);
        });
  }

  async getUsers() {
    await this.api.getAllUsers()
   .subscribe(res => {
      this.users = res;
    }, err => {
      console.log(err);
      });
  }

  updateStatus(containerId,containerData){
    let editedTask : Task = containerData;
    switch(containerId){
      case 'cdk-drop-list-0':{
        editedTask.status = "Open";
        editedTask.assignedTo = "None"
        this.updateTask(editedTask._id,editedTask);
        break;
      }
      case 'cdk-drop-list-1':{
        editedTask.status = "In-Progress";
        this.updateTask(editedTask._id,editedTask);
        break;
      }
      case 'cdk-drop-list-2':{
        editedTask.status = "Completed";
        this.updateTask(editedTask._id,editedTask);
        break;
      }
      case 'cdk-drop-list-3':{
        editedTask.status = "Archived";
        this.updateTask(editedTask._id,editedTask);
        break;
      }
    }
  }

  ngOnInit() {
    this.getTasks();
    this.getUsers();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if(event.previousContainer.id=="cdk-drop-list-0"&&event.container.id=="cdk-drop-list-1"
    || event.previousContainer.id=="cdk-drop-list-0"&&event.container.id=="cdk-drop-list-2"
    || event.previousContainer.id=="cdk-drop-list-3"&&event.container.id=="cdk-drop-list-1"
    || event.previousContainer.id=="cdk-drop-list-3"&&event.container.id=="cdk-drop-list-2" && event.item.data.assignedTo=="None"){
      this.task = event.item.data;
      this.openDialog(event);
    }else if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.updateStatus(event.container.id,event.item.data);
    }
  }
  
}

@Component({
  selector: 'select-user-dialog',
  templateUrl:'select-user-dialog.html',
})
export class SelectUserDialog {

  constructor(
    public dialogRef: MatDialogRef<SelectUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
