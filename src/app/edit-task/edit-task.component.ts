import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  users: User[];
  status = ["Open","In-Progress","Completed","Archived"]

  task: Task;

  editForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    assignedTo: new FormControl(''),
    status: new FormControl('')
  });

  constructor(private api: ApiService,private router:Router,public route: ActivatedRoute) { 

    }

  async getUsers() {
    await this.api.getAllUsers()
   .subscribe(res => {
      this.users = res;
    }, err => {
      console.log(err);
      });
  }

  async getTask(){
    await this.api.findTask(this.route.snapshot.paramMap.get('id'))
      .subscribe(task =>{
        this.task = task;
        this.editForm.setValue({
          name: this.task.name,
          description: this.task.description,
          assignedTo: this.task.assignedTo,
          status: this.task.status
        });
      },err =>{
        console.log(err);
      });
  }

  ngOnInit() {
    this.getUsers();
    this.getTask();
    
  }

  onSubmit(task) {

    this.api.editTask(this.task._id,task)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigateByUrl("/tasks-list");
      }), (err) => {
        console.log(err);
      }
    this.editForm.reset();
  }

}
