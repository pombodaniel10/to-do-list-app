import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Task} from '../interfaces/task';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  apiTask: string = '/tasks';
  apiUser: string = '/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  

  addTask (task): Observable<Task> {
    const url = `${this.apiTask}/add`
    return this.http.post<Task>(url, task, this.httpOptions).pipe(
      tap((task: Task) => console.log(`Task added w/ id=${task._id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  
  editTask (id,task): Observable<Task> {
    const url = `${this.apiTask}/edit/${id}`
    return this.http.put<Task>(url, task, this.httpOptions).pipe(
      tap((task: Task) => console.log(`Task edited w/ id=${task._id}`)),
      catchError(this.handleError<Task>('editTask'))
    );
  }

  deleteTask(id): Observable<Task>{
    const url = `${this.apiTask}/delete/${id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Task deleted id=${id}`)),
      catchError(this.handleError<Task>('deletedTask'))
    );
  }

  findTask(id): Observable<Task>{
    const url = `${this.apiTask}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => console.log(`Task found id=${id}`)),
      catchError(this.handleError<Task>(`findTask id=${id}`))
    );
  }

  deleteUser(id): Observable<User>{
    const url = `${this.apiUser}/delete/${id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => console.log(`User deleted id=${id}`)),
      catchError(this.handleError<User>('deletedUser'))
    );
  }

  findUser(id): Observable<User>{
    const url = `${this.apiUser}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`User found id=${id}`)),
      catchError(this.handleError<User>(`findUser id=${id}`))
    );
  }

  getAllTasks():Observable<Task[]>{
    const url = this.apiTask+'/getAll';
    return this.http.get<Task[]>(url).pipe(
      tap(_ => console.log(`Tasks list`)),
      catchError(this.handleError<Task[]>(`getAllTasks`))
    );
  }

  addUser (user): Observable<Task> {
    const url = `${this.apiUser}/add`
    return this.http.post<Task>(url, user, this.httpOptions).pipe(
      tap((task: Task) => console.log(`User added w/ id=${task._id}`)),
      catchError(this.handleError<Task>('userAdded'))
    );
  }

  getAllUsers():Observable<User[]>{
    const url = this.apiUser+'/getAll';
    return this.http.get<User[]>(url).pipe(
      tap(_ => console.log(`Users list`)),
      catchError(this.handleError<User[]>(`getAllUsers`))
    );
  }

}
