import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RestApiService } from '../../../core/services/rest-api.service';

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrl: './datatables.component.scss',
})
export class DatatablesComponent implements OnInit, OnChanges {
  @Input()
  isLoading: boolean = false;
  @Input() data!: any[];
  @Input() ApiUrl!: string;
  @Input() dataTableColumn!: Array<{}>;
  dtOptions: DataTables.Settings = {};
  callback?: Function;

  constructor(private _restApiService: RestApiService) {}
  
  ngOnInit() {
    this.dtOptions = {
      serverSide: true,
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
          targets: 0,
        },
      ],
      language: {
        emptyTable: 'No records found',
      },

      ajax: (dataTablesParameters: any, callback) => {
        console.log('ajax', dataTablesParameters)
        this.callback = callback;
        // this.fetchDataFromServer(dataTablesParameters, callback);
      },
      columns: [
        {
          orderable: false,
          data: null,
          defaultContent: '',
        },
      ],
    };

    this.dtOptions.columns = this.dtOptions.columns?.concat(
      this.dataTableColumn
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if ('data' in changes) {
      if (this.callback) {
        this.callback!({
          recordsTotal: 100,
          recordsFiltered: 100,
          data: this.data
        });
      }
    }
  }


  fetchDataFromServer(dataTablesParameters: any, callback: Function) {
    // this._restApiService.get(this.ApiUrl, '').subscribe((res) => {
    //   callback({
    //     recordsTotal: res.length,
    //     recordsFiltered: res.length,
    //     data: res,
    //   });
    // });
    const data = this.data;
    callback({
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data
    });
  }
}
