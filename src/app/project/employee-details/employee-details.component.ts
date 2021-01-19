import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , FormControl } from '@angular/forms'
import { EmployeeDetailsService } from './_services/employee-details.service';
import { saveAs } from 'file-saver';
import { Employee } from './_models/Employee';
import {  ViewChild} from '@angular/core';
import { MatTableDataSource   } from '@angular/material/table';
import {  MatPaginator  } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  displayedColumns: string[] = [  'employeeId', 'employeeName' , 'employeeMobile' , 'employeeEmail' , 'employeeDate' , 'action'];
  dataSource = new MatTableDataSource<Employee>();


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

 
  constructor(private fb: FormBuilder , private employeeDetailsService: EmployeeDetailsService) { }

  ngOnInit(): void {
  
      this.dataSource.paginator = this.paginator;
    
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

   getAllData(){
     this.employeeDetailsService.getAllData().subscribe(
       (data:any) => {

         this.dataSource.data = data;
         console.log(data);
       }
     )
   }
   loadAppointment(e: any){
     console.log(e);

   }

}
