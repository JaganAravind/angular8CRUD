import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../entity/employee';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = "/api/employee";
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  /* Create Employee */
  createEmployee(employee: Employee): Observable<number> {

    return this.http.post<Employee>(this.apiUrl + "/" + employee.empID, employee, {
      headers: this.httpHeaders,
      observe: 'response'
    }).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );
  }

  /* Get Employee List */
  getEmployeeDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(employee => console.log("No of employees: " + employee.length)),
      catchError(this.handleError)
    );
  }

  /* Get Employee By ID */
  getEmployeeById(employeeID: string): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl + "/" + employeeID).pipe(
      tap(employee => console.log(employee.empID + "" + employee.empName)),
      catchError(this.handleError)
    );
  }

  /* Updates Employee Detail */
  updateEmployeeDetails(employee: Employee): Observable<number> {
    return this.http.put<Employee>(this.apiUrl + "/" + employee.empID, employee, {
      headers: this.httpHeaders,
      observe: 'response'
    }).pipe(map(res => res.status),
      catchError(this.handleError)
    );
  }

  /* Delete Employee By ID */
  deleteEmployeeById(employeeID: string): Observable<number> {
    return this.http.delete<number>(this.apiUrl + "/" + employeeID).pipe(
      tap(status => console.log("status" + status)),
      catchError(this.handleError)
    );
  }

  /* Error Handler */
  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
}
