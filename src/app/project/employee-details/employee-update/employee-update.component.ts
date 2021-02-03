import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms'
import { EmployeeDetailsService } from '../_services/employee-details.service';
import { takeUntil } from 'rxjs/operators';
import { observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit , OnDestroy{

  private ubsubscribe$ = new Subject<void>();

  constructor( private fb: FormBuilder,
              private  employeeService: EmployeeDetailsService,
               public dialogRef: MatDialogRef<EmployeeUpdateComponent>,
               @Inject(MAT_DIALOG_DATA) public message: any) { }

  ngOnDestroy(): void {
    
    this.ubsubscribe$ .unsubscribe();
    this.ubsubscribe$.complete();

  }

               

  ngOnInit(): void {
    console.log('ss')
    this.patchValue();
  
  }

  profileForm = this.fb.group({
 
    employeeId:[''],
    employeeName: [''],
    employeeMobile: [''],
    employeeEmail: [''],
    departmentName: [''],
    address: this.fb.group  ({  line1:[''],
                city:[''],
                country:['']
              })
  })

  submit(form: any){

  }

  closeDialog(){
    this.dialogRef.close();
  }


patchValue() {
 
  this.profileForm.patchValue({
    employeeId: this.message['formData'].employeeId,
    employeeName: this.message['formData'].employeeName,
    employeeMobile: this.message['formData'].employeeMobile,
    employeeEmail: this.message['formData'].employeeEmail,
    employeeDepartment: this.message['formData'].departmentName,
 
    address: {
      line1: this.message['formData'].line1,
      city: this.message['formData'].city,
      country: this.message['formData'].country
    }
  
    
  })
}

updateEmployee(form: any){

  console.log('ss');
  console.log(form)
   
   this.employeeService.updateEmployee(form.value)
                                             .subscribe( (data) =>{
                                               console.log(data);
                                             })

}


}
