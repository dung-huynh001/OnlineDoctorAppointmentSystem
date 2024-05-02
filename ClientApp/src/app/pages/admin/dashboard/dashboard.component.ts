import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../core/services/statistic.service';
import { User } from '../../../core/models/auth.models';
import { AuthService } from '../../../core/services/auth.service';
import {
  iGenderStatistic,
  iWidget,
} from '../../../core/models/statistic.model';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from 'ng-apexcharts';
import { Colors } from 'chart.js';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title?: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  currentUser!: User;

  appointmentWidgets!: Array<iWidget>;
  resourceWidgets!: Array<iWidget>;

  genderChart: any;

  option = {
    startVal: 0,
    useEasing: true,
    duration: 2,
  };

  statisticFrom: Date = new Date();
  statisticTo: Date = new Date();

  appointmentChartOptions: ChartOptions;

  genderStatisticData: Array<iGenderStatistic> = [];

  constructor(
    private _statisticService: StatisticService,
    private _authService: AuthService
  ) {
    this.appointmentChartOptions = {
      series: [
        {
          name: 'High - 2013',
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: 'Low - 2013',
          data: [12, 11, 14, 18, 17, 13, 13],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Temperature',
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Dashboard', active: true },
    ];

    this.currentUser = this._authService.currentUser();

    this._statisticService
      .getStatisticAppointmentWidgets(
        this.currentUser.id,
        this.currentUser.userType
      )
      .subscribe((res) => (this.appointmentWidgets = res));

    this._statisticService
      .getStatisticResourceWidgets()
      .subscribe((res) => (this.resourceWidgets = res));

    this.statisticGenderChart();
  }

  statisticGenderChart() {
    this._statisticService.statisticGenderOfPatient().subscribe((res) => {
      this.genderStatisticData = res;
      const series = res.map((item) => item.value);
      const label = res.map((item) => item.title);
      const color = res.map((item) => item.color);
      this.genderChart = {
        series: series,
        labels: label,
        chart: {
          type: 'donut',
          height: 224,
        },
        plotOptions: {
          pie: {
            size: 100,
            offsetX: 0,
            offsetY: 0,
            donut: {
              size: '70%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '18px',
                  offsetY: -5,
                },
                value: {
                  show: true,
                  fontSize: '20px',
                  color: '#000000',
                  fontWeight: 500,
                  offsetY: 5,
                },
                total: {
                  show: true,
                  fontSize: '13px',
                  label: 'Total patient',
                  color: '#9599ad',
                  fontWeight: 500,
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        stroke: {
          lineCap: 'round',
          width: 2,
        },
        Colors: color,
        // Colors: ['#5ea3cb', '#58caea', '#6ada7d'],
      };
    });
  }
}
