import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from '../../core/models/auth.models';
import { environment } from '../../../environments/environment';

const HOSTNAME = environment.serverApi;

const STATUS_ENOUGH_INFO = '1';
const STATUS_NOT_ACTIVATE = '0';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit, AfterViewInit {
  element: any;
  @Output() mobileMenuButtonClicked = new EventEmitter();
  userData!: User | null;
  isDropdownOpen = false;
  isActivated: boolean = false;

  HOSTNAME: string = HOSTNAME;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public languageService: LanguageService,
    private modalService: NgbModal,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.authService.status$.subscribe((val) => {
      if (val && val != STATUS_NOT_ACTIVATE && val != STATUS_ENOUGH_INFO) {
        this.isActivated = true;
      }
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.userData = user;
    });
    this.element = document.documentElement;

    this.userData!.avatarUrl =
      this.userData?.avatarUrl ?? `/Uploads/Images/default-user.jpg`;

    if (
      this.authService.status$.value != STATUS_NOT_ACTIVATE &&
      this.authService.status$.value != STATUS_ENOUGH_INFO
    ) {
      this.isActivated = true;
    }
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open');
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    // this.submitted = false;
    this.modalService.open(content, { centered: true });
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
  }

  windowScroll() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }
  toggleDropdown(event: Event) {
    event.stopPropagation();
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    } else {
      this.isDropdownOpen = true;
    }
  }
}
