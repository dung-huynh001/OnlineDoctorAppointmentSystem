export interface iWidget {
  title: string;
  shortDesc: string;
  icon: string;
  badge: string;
  badgeClass: string;
  prefix: string;
  suffix: string;
  isIncrease: boolean;
  increaseValue: string;
  value: number;
  createdDate: Date;
}

export interface iGenderStatistic {
  title: string;
  value: number;
  percentage: number;
  suffix: string;
  color: string;
  icon: string;
}

export type AppointmentStatisticRequest = {
  from: Date;
  to: Date;
  renderBy: string;
}


export interface iAppointmentStatistic {
  colors: Array<string>;
  series: Array<{
    name: string;
    data: Array<number>
  }>;
  xaxis: {
    categories: any[];
    title: {
      text: string;
    }
  };
  yaxis: {
    categories: any[];
    title: {
      text: string;
    };
    floating: boolean;
    max: any;
    min: any;
  }
}

