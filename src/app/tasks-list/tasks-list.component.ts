import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Task } from '../interfaces/task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface DialogData {
  task: Task;
}

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Task[];
  task: Task;
  displayedColumns: string[] = ['name', 'description', 'assignedTo', 'status','actions'];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api: ApiService,public router: Router,public dialog: MatDialog) { }

  openDialog(task:Task): void {
    this.task = task;
    const dialogRef = this.dialog.open(DeleteDialog, {
      height: '200px',
      width: '600px',
      data: {task: this.task}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        this.api.deleteTask(this.task._id)
      .subscribe(res =>{
        console.log(res);
        this.router.navigateByUrl('/', {skipLocationChange: true})
          .then(() => this.router.navigate(['/tasks-list']));
      }, err => {
        console.log(err);
      });
      }
    });
  }

  async getTasks() {
    await this.api.getAllTasks()
     .subscribe(res => {
        this.tasks = res;
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.sort = this.sort;
      }, err => {
        console.log(err);
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getTasks();
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl:'delete-dialog.html',
})
export class DeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
