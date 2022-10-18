import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
      this.isLoading = false;
    })
  }

}
