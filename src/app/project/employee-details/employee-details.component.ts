import { Component, Inject, OnInit } from '@angular/core';
import {  FormBuilder  } from '@angular/forms'
import { EmployeeDetailsService } from './_services/employee-details.service';
import { saveAs } from 'file-saver';
import { Employee } from './_models/Employee';
import {  ViewChild} from '@angular/core';
import { MatTableDataSource   } from '@angular/material/table';
import {  MatPaginator  } from '@angular/material/paginator';
import { Store  } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  
  employees$: Observable<Employee[]> = this.store.select(state => state.employees);

  displayedColumns: string[] = [  'employeeId', 'employeeName' , 'employeeMobile' , 'employeeEmail' , 'employeeDate' , 'line1' , 'city' , 'country' , 'action'];
  dataSource = new MatTableDataSource<Employee>();
 
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  firstVal: any;
  maxResult: any;
  totalCount: any;

 
  constructor(private fb: FormBuilder , private employeeDetailsService: EmployeeDetailsService ,
                          public dialog: MatDialog ,
                          @Inject(MAT_DIALOG_DATA) public message: any,
                          private store: Store<{ employees: Employee[] }>) { }

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

   getAlld(form: any  ){
    
    
    this.firstVal  = this.paginator.pageIndex + ''  ;
   this.maxResult = this.paginator.pageSize + '';
   
    this.employeeDetailsService.getAll().subscribe(
      (data:any) => {

     // const filteredData = data.filter((d: { line1: any; city: any; country: any  }) => d.line1 = d.line1 + ' ' + d.city + ' ' + d.country)   
      // this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource = data;
        this.totalCount  = data.totalElements;
        console.log( this.totalCount);
      }
    )
  }


    loadAppointment(e: any){
        console.log(e);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'custom-dialog-container';
        dialogConfig.data = {
          formData: e,
   
    };
    //dialogConfig.width =  '90%';
    const dialogRef  = this.dialog.open(EmployeeUpdateComponent , dialogConfig);


      dialogRef.afterClosed().subscribe(
          data => console.log("Dialog output:", data)
      );    

    }
   //With Effects
   
   //to test ngrx

   getAll(){
     console.log('get All')
    this.store.dispatch({ type: '[Employees Page] Load Employee' });

   }

   //with rxjs



}
