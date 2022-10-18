import { Component, OnInit } from '@angular/core';

import { Employee } from 'src/app/models/Employee';
import { EmployeeData } from 'src/app/models/EmployeeData';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeesSummary: EmployeeData[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getAll().subscribe({
      next: (data) => {
        let employees: EmployeeData[] = this.calculateEmployeesWorkedMinutes(data);
        let result: EmployeeData[] = this.groupEmployeesByName(employees);
        this.employeesSummary = result.sort((a, b) => b.MinutesWorked - a.MinutesWorked);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    })
  }

  private groupEmployeesByName(employees: EmployeeData[]): EmployeeData[] {
    let result: EmployeeData[] = [];
    employees.reduce((res: any, value: any) => {
      if (!res[value.Name]) {
        res[value.Name] = { Name: value.Name, MinutesWorked: value.MinutesWorked };
        result.push(res[value.Name])
      }
      res[value.Name].MinutesWorked += value.MinutesWorked;
      return res;
    }, {})

    return result;
  }

  private calculateEmployeesWorkedMinutes(employees: Employee[]): EmployeeData[] {
    return employees.map((employee) => {
      let minutes = (new Date(employee.EndTimeUtc).getTime() - new Date(employee.StarTimeUtc).getTime()) / 1000 / 60;
      return {
        Name: employee.EmployeeName ?? 'unknown',
        MinutesWorked: minutes > 0 ? minutes : 0
      }
    });
  }
}
