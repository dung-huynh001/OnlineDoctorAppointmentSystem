import { Component } from '@angular/core';
import { DATA_PRELOADER, LAYOUT_MODE, LAYOUT_POSITION, LAYOUT_WIDTH, SIDEBAR_VIEW, TOPBAR } from '../layouts.model';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrl: './horizontal.component.scss'
})
export class HorizontalComponent {
  constructor() { }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-layout', 'horizontal');
    document.documentElement.setAttribute('data-topbar', TOPBAR);
    document.documentElement.setAttribute('data-layout-style', SIDEBAR_VIEW);
    document.documentElement.setAttribute('data-bs-theme', LAYOUT_MODE);
    document.documentElement.setAttribute('data-layout-width', LAYOUT_WIDTH);
    document.documentElement.setAttribute('data-layout-position', LAYOUT_POSITION);
    document.documentElement.setAttribute('data-preloader', DATA_PRELOADER);
    if (document.documentElement.clientWidth <= 1024) {

      (document.documentElement.getAttribute('data-sidebar-size') == "sm") ? document.documentElement.setAttribute('data-sidebar-size', 'lg') : document.documentElement.setAttribute('data-sidebar-size', 'sm')
      // document.body.classList.toggle('menu');
      // document.documentElement.setAttribute('data-sidebar-size', 'lg');
      // document.body.classList.toggle('vertical-sidebar-enable');
    }
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', "visibility: visible;");
    }
  }
}
