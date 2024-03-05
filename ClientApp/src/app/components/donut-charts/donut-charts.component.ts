import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-charts',
  templateUrl: './donut-charts.component.html',
  styleUrl: './donut-charts.component.scss',
})
export class DonutChartsComponent implements OnInit {
  @Input() chartTitle!: string;


  donutChart!: any;


  constructor() { }

  ngOnInit(): void {

    this._donutChart('["--vz-primary", "--vz-light", "--vz-warning"]');

  }

  // Chart Colors Set
  private getChartColorsArray(colors:any) {
    colors = JSON.parse(colors);
    return colors.map(function (value:any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color) {
            color = color.replace(" ", "");
            return color;
            }
            else return newValue;;
        } else {
            var val = value.split(',');
            if (val.length == 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
  }
  /**
 * Donut Chart
 */
  private _donutChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.donutChart = {
      labels: [
        "Male",
        "Female",
        "Other",
      ],
      datasets: [
        {
            data: [300, 210, 100],
            backgroundColor: colors,
            hoverBackgroundColor: colors,
            hoverBorderColor: "#fff"
        }],
      options: {
          maintainAspectRatio: false,
          legend: {
              position: 'top',
          }
      }
    };
  }

}
