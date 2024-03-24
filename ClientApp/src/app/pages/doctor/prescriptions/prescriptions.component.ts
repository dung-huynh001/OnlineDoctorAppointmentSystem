import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.scss'
})
export class PrescriptionsComponent implements OnInit {
  breadcrumbItems!: Array<{}>;
  drugData!: Array<{
    no: number,
    title: string,
    status: string,
    assignee: string,
    price: number | any,
  }>;

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Home' },
      { label: 'Prescriptions', active: true },
    ];

    this.drugData = [];
  }

  addRow() {
    this.drugData.push({
      no: this.drugData.length + 1,
      title: '',
      status: '',
      assignee: '',
      price: '',
    });
  }

  deleteRow(index: number) {
    this.drugData.splice(index, 1);
    this.drugData.map(drug => {
      if(drug.no >index) {
        drug.no--;
      }
    })
  }

  resetRows() {
    this.drugData = [];
  }
}
