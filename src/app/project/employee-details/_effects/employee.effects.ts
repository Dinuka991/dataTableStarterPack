import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EmployeeDetailsService } from '../_services/employee-details.service';

@Injectable()
export class EmployeeEffects {

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Employees Page] Load Employees'),
      mergeMap(() => this.empService.getAll()
        .pipe(
          map(employees  => ({ type: '[Employees API] Employees Loaded Success', payload: employees })),
          catchError(() => of({ type: '[Employee API] Employees Loaded Error' }))
          
        )
        
      )
    )
    
  );

  constructor(
    private actions$: Actions,
    private empService: EmployeeDetailsService
  ) {}
}