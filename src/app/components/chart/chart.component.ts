import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart, ChartType, ChartDataset, ChartOptions, ChartTypeRegistry, ChartConfiguration, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { EmployeeData } from 'src/app/models/EmployeeData';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
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

  @Input() employees: EmployeeData[] = [];
  constructor() { }

  ngOnChanges() {
    if (this.employees) {
      this.chartData = [{ data: this.employees.map(e => e.MinutesWorked) }]
      this.chartLabels = this.employees.map(e => e.Name);
    }
  }
  ngOnInit(): void {
  }

}
