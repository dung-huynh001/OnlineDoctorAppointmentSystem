import { SortColumn } from './../list-tables/listjs-sortable.directive';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrl: './datatables.component.scss'
})
export class DatatablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.dtOptions = {
      paging: true,
      searching: true,
      ordering: true,
      pagingType: 'full_numbers',
      processing: true,
      responsive: true,
      order: [[1, 'asc']],
      columnDefs: [
        { targets: [0, -1], searchable: false },
        { targets: -1, orderable: false },
        {
          className: 'dtr-control',
          orderable: false,
          width: '15px',
          searchable: false,
          targets: 0
        }
      ],
      language: {
        emptyTable: 'No records found'
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.fetchDataFromServer(dataTablesParameters, callback);
      },
      columns: [
        {
          "orderable": false,
          "data": null,
          "defaultContent": '',
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Age',
          data: 'age'
        },
        {
          title: 'Action',
          data: null,
          render: (data, type, row, meta) => {
            var viewButton = '<button class="btn btn-soft-info btn-sm view-btn">View</button>';
            var editButton = '<button class="btn btn-soft-primary btn-sm view-btn">Edit</button>';
            var deleteButton = '<button class="btn btn-soft-danger btn-sm delete-btn">Delete</button>';
            return `${viewButton} ${editButton} ${deleteButton}`;
          }
        }
      ]
    }
  }
  fetchDataFromServer(dataTablesParameters: any, callback: Function) {
    const url = 'your-api-endpoint';
    const data = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Doe', age: 25 },
      { name: 'Peter Smith', age: 40 },
    ];
    callback({
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data
    });
  }
}
