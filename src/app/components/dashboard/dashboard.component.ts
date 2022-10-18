import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartType, ChartDataset, ChartOptions, ChartTypeRegistry, ChartConfiguration, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


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

  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartType: ChartType = 'pie';
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += Number(data);
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: 'black',
        align: 'end',
        padding: 40
      }
    }
  }
  chartPlugins: Plugin[] = [ChartDataLabels];


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.getAll().subscribe({
      next: (data) => {
        let employees: EmployeeData[] = this.calculateEmployeesWorkedMinutes(data);
        let result: EmployeeData[] = this.groupEmployeesByName(employees);
        this.employeesSummary = result.sort((a, b) => b.MinutesWorked - a.MinutesWorked);
        let totalMinutesWorked: number = this.employeesSummary.reduce((a, b) => a + b.MinutesWorked, 0)

        //#region chart
        this.chartData = [{ data: this.employeesSummary.map(e => e.MinutesWorked) }]
        this.chartLabels = this.employeesSummary.map(e => e.Name);
        //#endregion chart
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
        Name: employee.EmployeeName,
        MinutesWorked: minutes > 0 ? minutes : 0
      }
    });
  }
}
