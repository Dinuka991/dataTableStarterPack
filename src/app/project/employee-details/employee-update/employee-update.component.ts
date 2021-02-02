import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {

  constructor( private fb: FormBuilder,
               public dialogRef: MatDialogRef<EmployeeUpdateComponent>,
               @Inject(MAT_DIALOG_DATA) public message: any) { }

               

  ngOnInit(): void {
    this.patchValue();
  
  }

  profileForm = this.fb.group({
 
    employeeId:[''],
    employeeName: [''],
    employeeMobile: [''],
    employeeEmail: [''],
    employeeDepartment: ['']
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
    employeeDepartment: this.message['formData'].departmentName
    
  })
}



}
