import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ListModel } from './list.model';
import Swal from 'sweetalert2';
import { ListService } from './list.service';
import { NgbdListSortableHeader, SortEvent } from './list-sortable.directive';
import { DatePipe } from '@angular/common';
import { RestApiService } from '../../core/services/rest-api.service';

@Component({
  selector: 'app-schedule-of-doctors',
  templateUrl: './schedule-of-doctors.component.html',
  styleUrl: './schedule-of-doctors.component.scss'
})
export class ScheduleOfDoctorsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  ordersForm!: UntypedFormGroup;
  CustomersData!: ListModel[];
  masterSelected!: boolean;
  checkedList: any;
  submitted = false;

  // Api Data
  content?: any;
  lists?: any;
  econtent?: any;

  // Table data
  ticketsList!: Observable<ListModel[]>;
  total: Observable<number>;
  @ViewChildren(NgbdListSortableHeader) headers!: QueryList<NgbdListSortableHeader>;

  constructor(private modalService: NgbModal, public service: ListService, private formBuilder: UntypedFormBuilder, private ApiService: RestApiService, private datePipe: DatePipe) {
    this.ticketsList = service.lists$;
    this.total = service.total$;
  }


  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Schedule of doctors', active: true }
    ];

    /**
     * Form Validation
     */
    this.ordersForm = this.formBuilder.group({
      id: ['#VLZ5'],
      ids: [''],
      title: ['', [Validators.required]],
      client: ['', [Validators.required]],
      assigned: ['', [Validators.required]],
      create: ['', [Validators.required]],
      due: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });

    /**
     * fetches data
     */
    setTimeout(() => {
      this.ticketsList.subscribe(x => {
        this.content = this.lists;
        this.lists = Object.assign([], x);
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000);
  }

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  /**
 * Confirmation mail model
 */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.ApiService.deleteTicket(id).subscribe({
        next: data => { },
        error: err => {
          this.content = JSON.parse(err.error).message;
        }
      });
      document.getElementById('t_' + id)?.remove();
    }
    else {
      this.checkedValGet.forEach((item: any) => {
        document.getElementById('t_' + item)?.remove();
      });
    }
  }

  /**
  * Multiple Delete
  */
  checkedValGet: any[] = [];
  deleteMultiple(content: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    var result
    var checkedVal: any[] = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    if (checkedVal.length > 0) {
      this.modalService.open(content, { centered: true });
    }
    else {
      Swal.fire({ text: 'Please select at least one checkbox', confirmButtonColor: '#239eba', });
    }
    this.checkedValGet = checkedVal;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.lists.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.lists.length; i++) {
      if (this.lists[i].state == true) {
        result = this.lists[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.lists.length; i++) {
      if (this.lists[i].state == true) {
        result = this.lists[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.ordersForm.controls;
  }

  /**
    * Save user
    */
  saveUser() {
    if (this.ordersForm.valid) {
      if (this.ordersForm.get('ids')?.value) {
        this.ApiService.patchTicketData(this.ordersForm.value).subscribe(
          (data: any) => {
            this.service.ticketList = this.content.map((order: { _id: any; }) => order._id === data.data.ids ? { ...order, ...data.data } : order);
            this.modalService.dismissAll();
          }
        )
      }
      else {
        this.ApiService.postTicketData(this.ordersForm.value).subscribe(
          (data: any) => {
            this.service.ticketList.push(data.data);
            this.modalService.dismissAll();
            let timerInterval: any;
            Swal.fire({
              title: 'Order inserted successfully!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });
          },)
      }
    }
    setTimeout(() => {
      this.ordersForm.reset();
    }, 2000);
    this.submitted = true
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Ticket';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.ApiService.getSingTicketData(id).subscribe({
      next: data => {
        const users = JSON.parse(data);
        this.econtent = users.data;
        this.ordersForm.controls['id'].setValue(this.econtent.id);
        this.ordersForm.controls['title'].setValue(this.econtent.title);
        this.ordersForm.controls['client'].setValue(this.econtent.client);
        this.ordersForm.controls['assigned'].setValue(this.econtent.assigned);
        this.ordersForm.controls['create'].setValue(this.econtent.create);
        this.ordersForm.controls['due'].setValue(this.econtent.due);
        this.ordersForm.controls['status'].setValue(this.econtent.status);
        this.ordersForm.controls['priority'].setValue(this.econtent.priority);
        this.ordersForm.controls['ids'].setValue(this.econtent._id);
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  // Filtering
  isstatus?: any
  SearchData() {
    var status = document.getElementById("idStatus") as HTMLInputElement;
    var date = document.getElementById("isDate") as HTMLInputElement;
    var dateVal = date.value ? this.datePipe.transform(new Date(date.value), "yyyy-MM-dd") : '';
    if (status.value != 'all' && status.value != '' || dateVal != '') {
      this.lists = this.content.filter((ticket: any) => {
        return this.datePipe.transform(new Date(ticket.create), "yyyy-MM-dd") == dateVal || ticket.status === status.value;
      });
    }
    else {
      this.lists = this.content;
    }
  }

  /**
* Sort table data
* @param param0 sort the column
*
*/
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
