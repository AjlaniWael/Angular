import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  // Parent component will use this Input property to pass
  // the employee object to which the template binds to
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete : EventEmitter<number> = new EventEmitter<number>();
  private selectedEmployeeId: number;
  confirmDelete = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService : EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  getNameAndGender(): string {
    return this.employee.name + ' ' + this.employee.gender;
  }
  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }
  deleteEmployee(){
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`employee with id= ${this.employee.id} deleted `),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }

    // ngOnChanges(changes: SimpleChanges) {
    //   const previousEmployee = <Employee>changes.employee.previousValue;
    //   const currentEmployee = <Employee>changes.employee.currentValue;

    //   console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL') );
    //   console.log('Current : ' + currentEmployee.name);
    // }

    // Private backing field for the property
    /*  private _employee: Employee;
   
     // This property setter is called anytime the input property changes
     // Notice the code here logs the previous and current employee names
     @Input()
     set employee(val: Employee) {
       console.log('Previous : ' + (this._employee ? this._employee.name : 'NULL'));
       console.log('Current : ' + val.name);
       this._employee = val;
     } */

    /*   // This getter is called when reading and displaying data
      get employee(): Employee {
        return this._employee;
      } */
  }
