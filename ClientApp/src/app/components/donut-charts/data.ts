import { ChartType } from './chartjs.model';

/**
 * Donut Chart
 */
 const donutChart: ChartType = {
  labels: [
    "Desktops",
    "Tablets"
  ],
  datasets: [
    {
        data: [300, 210],
        backgroundColor: ["#6691E7","#F3F6F9"],
        hoverBackgroundColor: ["#6691E7","#F3F6F9"],
        hoverBorderColor: "#fff"
    }],
  options: {
      maintainAspectRatio: false,
      legend: {
          position: 'top',
      }
  }
};


export { donutChart};
