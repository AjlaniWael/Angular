import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';

import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  panelTitle: string;
  employee: Employee;
  gender = 'male';
  isActive = true;
  department = "2";
  dateOfBirth: Date = new Date(2018, 0, 30);
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  constructor(private _employeeService: EmployeeService,
    private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: true,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2018, 11, 31),
      dateInputFormat: 'DD/MM/YYYY',
    });
  }


  // Subscribe to route parameter changes and react accordingly
  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  /* saveEmployee(): void {
    const newEmployee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  } */
  //save employee with post http
/*   saveEmployee(): void {
    this._employeeService.save(this.employee).subscribe(
      (data: Employee) => {
        // log the employee object after the post is completed
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => { console.log(error); }
    );
  } */

  saveEmployee(): void {
    if (this.employee.id == null) {
      console.log(this.employee);
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    }
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null, name: null, gender: null, contactPreference: null,
        phoneNumber: null, email: '', dateOfBirth: null, department: null,
        isActive: null, photoPath: null
      };
      this.createEmployeeForm.reset();
      this.panelTitle = 'Create Employee';
    } else {
      this._employeeService.getEmployee(id).subscribe(
        (employee) => { this.employee = employee; },
        (err: any) => console.log(err)
      );
      this.panelTitle = 'Edit Employee';
    }
  }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

}
