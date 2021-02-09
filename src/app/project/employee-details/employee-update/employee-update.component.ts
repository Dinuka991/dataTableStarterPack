import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, NgModel } from '@angular/forms'
import { EmployeeDetailsService } from '../_services/employee-details.service';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, observable, Subject, Subscription } from 'rxjs';
import { Department } from '../_models/Department';
import { Country } from '../_models/Country';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit , OnDestroy{

  private ubsubscribe$ = new Subject<void>();
  departments!: any;


  
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  @ViewChild('filterInout', { static: true })
  filterInout!: NgModel;

  countryArray: string[] =[];

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
    this.getDepartmentList();
    this.getCountryList();
  


     

    this.filteredOptions = this.profileForm.controls['country'].valueChanges.pipe(
     
      startWith(''),
      map(value => this._filter(value))
    );

    
  
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  profileForm = this.fb.group({
 
    employeeId:[''],
    employeeName: [''],
    employeeMobile: [''],
    employeeEmail: [''],
    departmentName: [''],
    
    address: this.fb.group  ({  
                line1:[''],
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

getDepartmentList(){
  this.employeeService.getDepartmentList().pipe(takeUntil(this.ubsubscribe$))
                                          .subscribe( (data) => {
                                            this.departments = data;
                                          } )
}

getCountryList(): any {
  this.employeeService.getCountryList().subscribe( (data) => {
          data.forEach((item: { countryName: any; }) => {
   
 
      this.countryArray.push(item.countryName);
    

  });

  

  } 
  )
    //this.options = this.countryArray;                                  
  console.log(this.options)                            
                                          
}





}
