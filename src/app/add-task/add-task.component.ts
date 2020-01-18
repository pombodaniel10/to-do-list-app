import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  users: User[];
  addForm;

  constructor(private api: ApiService,private formBuilder: FormBuilder,private router:Router) { 

    this.addForm = this.formBuilder.group({
      'name': ['',Validators.required],
      'description': ['',Validators.required],
      'assignedTo': ['None'],
      'status': ['Open']
    });

    }

  async getUsers() {
    await this.api.getAllUsers()
   .subscribe(res => {
      this.users = res;
      console.log(this.users);
    }, err => {
      console.log(err);
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  onSubmit(task) {

    if(task.assignedTo!="None"){
      task.status = "In-Progress";
    }

    this.api.addTask(task)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigateByUrl("/");
      }), (err) => {
        console.log(err);
      }
    this.addForm.reset();
  }

}
