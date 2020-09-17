import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions;
  constructor() {
    this.chartOptions = {
      series: [23, 11, 54, 72, 12],
      labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],
      chart: {
        height: 350,
        type: "pie"
      },
      title: {
        text: "Pie Chart"
      },
    };
  }

  ngOnInit(): void {
  }


}
