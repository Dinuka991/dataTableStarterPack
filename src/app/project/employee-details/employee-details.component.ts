import { Component, OnInit } from '@angular/core';
import {  FormBuilder  } from '@angular/forms'
import { EmployeeDetailsService } from './_services/employee-details.service';
import { saveAs } from 'file-saver';
import { Employee } from './_models/Employee';
import {  ViewChild} from '@angular/core';
import { MatTableDataSource   } from '@angular/material/table';
import {  MatPaginator  } from '@angular/material/paginator';
import { Store  } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  
  employees$: Observable<Employee[]> = this.store.select(state => state.employees);

  displayedColumns: string[] = [  'employeeId', 'employeeName' , 'employeeMobile' , 'employeeEmail' , 'employeeDate' , 'action'];
  dataSource = new MatTableDataSource<Employee>();
 
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  firstVal: any;
  maxResult: any;
  totalCount: any;

 
  constructor(private fb: FormBuilder , private employeeDetailsService: EmployeeDetailsService , private store: Store<{ employees: Employee[] }>) { }

  ngOnInit(): void {

   
     this.getAll();
  }
 
  profileForm = this.fb.group({
    employeeId: [''],
    employeeName: [''],
    employeeMobile: ['']
  })



  downloadExel(){

    this.employeeDetailsService.downloadExel().subscribe(
      (data:any) => {

        const blob = new Blob([data], {type: 'application/octet-stream'});
        const file = new File([blob], 'NewCutomerReport' + '.xlsx', {type: 'application/vnd.ms.excel'});
        saveAs(file);

      }
    )
  }

   getAllData(form: any  ){
    
    this.firstVal  = this.paginator.pageIndex + '' ;
    this.maxResult = this.paginator.pageSize + '';
    
     this.employeeDetailsService.getAllData(form.value , this.firstVal , this.maxResult).subscribe(
       (data:any) => {

         this.dataSource.data = data.content;
         this.totalCount  = data.totalElements;
         console.log( this.totalCount);
       }
     )
   }

   loadAppointment(e: any){
     console.log(e);

   }
   //to test ngrx
   getAll(){
     console.log('get All')
    this.store.dispatch({ type: '[Employees Page] Load Employee' });

   }

}
