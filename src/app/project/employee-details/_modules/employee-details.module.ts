import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsService } from '../_services/employee-details.service';
import {MatCardModule} from '@angular/material/card';
import { EmployeeDetailsComponent } from '../employee-details.component';



@NgModule({
  declarations: [
    EmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    
    
  ],
  providers: [EmployeeDetailsService]
})
export class EmployeeDetailsModule { }
