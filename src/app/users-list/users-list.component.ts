import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../interfaces/user';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface DialogData {
  name: String;
}

export interface UserData{
  user: User
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  name: string;
  user:User;
  displayedColumns: string[] = ['name','assignedTasks','actions'];
  dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api:ApiService,public dialog: MatDialog, private router:Router) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog, {
      height: '200px',
      width: '600px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
      let user = {name:this.name};
      this.api.addUser(user)
        .subscribe(res => {
          this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => this.router.navigate(['/users-list']));
        }, err => {
          console.log(err);
        });
    });
  }

  deleteUser(user): void {
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      height: '200px',
      width: '600px',
      data: {user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result!=null){
        this.api.deleteUser(result)
          .subscribe(res =>{
            console.log(res);
            this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(() => this.router.navigate(['/users-list']));
          }, err => {
            console.log(err);
        });
      }
    });
  }

  async getUsers() {
    await this.api.getAllUsers()
   .subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getUsers();
  }

}

@Component({
  selector: 'add-user-dialog',
  templateUrl:'add-user-dialog.html',
})
export class AddUserDialog {

  constructor(
    public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-user-dialog',
  templateUrl:'delete-user-dialog.html',
})
export class DeleteUserDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UserData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}