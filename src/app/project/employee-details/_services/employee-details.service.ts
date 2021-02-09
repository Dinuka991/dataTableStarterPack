import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../_models/Employee';
import { Department } from '../_models/Department';
import { Country } from '../_models/Country';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor(private http: HttpClient) { }
   
  downloadExel(): Observable<any>{
    return this.http.get<any>('http://localhost:8080/employee-services/download/employee.xlsx' ,   {responseType: 'blob' as 'json'});
  }

  getAllData(obj: any ,_first: any ,_maxResult: any ): Observable<Employee>{
    
    let httpParam = new HttpParams().set('first',_first)
                                    .set('maxResult',_maxResult)
                                    .set('employeeId', obj.employeeId )
                                    .set('employeeName' , obj.employeeName)
                                    .set('employeeMobile', obj.employeeMobile);

    return this.http.get<Employee>('http://localhost:8080/employee-services/search?' + httpParam);
  }

  // to test ngrx 
  getAll() {
    return this.http.get<Employee>('http://localhost:8080/employee-services/all');
  }

  updateEmployee(obj: Employee):Observable<Employee>{
    return this.http.put<Employee>('http://localhost:8080/employee-services/add' , obj);
  }
    
  getDepartmentList():Observable<Department>{
    return this.http.get<Department>('http://localhost:8080/department-service/getAllDep');
  }

  getCountryList():Observable<any>{
    return this.http.get<any>('http://localhost:8080/employee-services/countries');
  }

}
