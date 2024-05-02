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
}

