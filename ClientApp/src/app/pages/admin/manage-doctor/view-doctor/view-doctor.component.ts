import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.scss',
})
export class ViewDoctorComponent implements OnInit, AfterViewInit {
  breadCrumbItems!: Array<{}>;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  constructor(
    private datePipe: DatePipe,
    private _toastService: ToastService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Department Management', active: true },
    ];

    this.dtOptions = {
      serverSide: true,
      pagingType: 'full_numbers',
      processing: true,
      responsive: true,
      destroy: true,
      order: [[1, 'asc']],
      columnDefs: [
        { targets: [0, -1], searchable: false },
        { targets: [-1], orderable: false },
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
      columns: [
        {
          orderable: false,
          data: null,
          defaultContent: '',
        },
      ],
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }
}
