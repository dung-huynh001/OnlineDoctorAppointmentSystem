import { Component, Input, OnInit } from '@angular/core';
import { paginationlist } from './data';

@Component({
  selector: 'app-list-tables',
  templateUrl: './list-tables.component.html',
  styleUrl: './list-tables.component.scss',
})
export class ListTablesComponent implements OnInit {
  @Input() title?: string;
  page: any = 1;
  pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;

  paginationDatas: any;
  term: any;

  ngOnInit(): void {
    this.paginationDatas = paginationlist;
    this.totalRecords = this.paginationDatas.length

    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(this.startIndex - 1, this.endIndex);
  }

  /**
   * Pagination
   */
  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(
      this.startIndex - 1,
      this.endIndex
    );
  }
}
