import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  dataFromChild: Employee;
  searchTerm: string;
  error: string;
  /* employeeToDisplay: Employee; */

  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {

    // resolvedData can either be a string or Employee[]
    const resolvedData: string | Employee[] = this._route.snapshot.data['employeeList'];

    // If the resolver completed without errors resolvedData is an Employee[]
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.employees = this.employees;
    }
  }

  ngOnInit() {
  }
  onDeleteNotification(id: number) {
    const i = this.employees.findIndex(e => e.id === id);
    if (i !== -1) {
      //this.filtredEmployees.splice(i, 1); mais j'ai pas fait cette liste :(
      this.employees.splice(i, 1);
    }
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    });
  }

  /* nextEmployee(): void {
    if (this.employeeToDisplay.id <= 2) {
      this.employeeToDisplay = this.employees[this.employeeToDisplay.id];
    } else {
      this.employeeToDisplay = this.employees[0];
    }
  } */
}