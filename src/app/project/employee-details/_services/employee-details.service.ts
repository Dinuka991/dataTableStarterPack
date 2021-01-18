import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../_models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor(private http: HttpClient) { }
   
  downloadExel(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/employee-services/download/employee.xlsx' ,   {responseType: 'blob' as 'json'});
  }

  getAllData(): Observable<Employee>{
    return this.http.get<Employee>('http://localhost:8080/employee-services/all');
  }
      

}
