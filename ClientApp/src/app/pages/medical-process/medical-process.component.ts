import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-process',
  templateUrl: './medical-process.component.html',
  styleUrl: './medical-process.component.scss'
})
export class MedicalProcessComponent implements OnInit {
  
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Menu' },
      { label: 'Medical Process', active: true }
    ];
  }

    /**
   * Swiper setting
   */
    config = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false
    };
}
