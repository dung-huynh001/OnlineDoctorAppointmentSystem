import { MenuItem } from './menu.model';

export const MENU_PATIENT: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'las la-tachometer-alt',
    link: '/'
  },
  {
    id: 3,
    label: 'MENUITEMS.MAKEAPPOINTMENT.TEXT',
    icon: 'las la-calendar-plus',
    link: '/patient/make-appointment'
  },
  {
    id: 4,
    label: 'MENUITEMS.MANAGEAPPOINTMENT.TEXT',
    icon: 'las la-calendar',
    subItems: [
      {
        id: 5,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.ALL',
        link: '/patient/appointment/all',
        parentId: 4
      },
      {
        id: 6,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.WAITING',
        link: '/patient/appointment/waiting',
        parentId: 4
      },
      {
        id: 7,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.COMPLETE',
        link: '/patient/appointment/completed',
        parentId: 4
      },
      {
        id: 8,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.OUTOFDATE',
        link: '/patient/appointment/out-of-date',
        parentId: 4
      },
      {
        id: 9,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CANCEL',
        link: '/patient/appointment/cancelled',
        parentId: 4
      },
    ]
  },
  {
    id: 10,
    label: 'MENUITEMS.SCHEDULEOFDOCTOR.TEXT',
    icon: 'las la-user-nurse',
    link: '/schedule-of-doctors'
  },
  {
    id: 11,
    label: 'MENUITEMS.MEDICALPROCESS.TEXT',
    icon: 'las la-procedures',
    link: '/medical-process'
  },
  {
    id: 12,
    label: 'MENUITEMS.ABOUTUS.TEXT',
    icon: 'las la-user-friends',
    link: '/about'
  },
  {
    id: 13,
    label: 'MENUITEMS.HELP.TEXT',
    icon: 'las la-info-circle',
    link: '/help'
  },
  {
    id: 14,
    label: 'MENUITEMS.LOGOFF.TEXT',
    icon: 'las la-file-export',
    link: ''
  }
];


export const MENU_ADMIN: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'las la-tachometer-alt',
  },
  {
    id: 3,
    label: 'MENUITEMS.USERMANAGEMENT.TEXT',
    icon: 'las la-users',
    subItems: [
      {
        id: 4,
        label: 'MENUITEMS.USERMANAGEMENT.LIST.PATIENT',
        link: '',
        parentId: 3
      },
      {
        id: 5,
        label: 'MENUITEMS.USERMANAGEMENT.LIST.DOCTOR',
        link: '/admin/manage-doctor',
        parentId: 3
      },
      {
        id: 6,
        label: 'MENUITEMS.USERMANAGEMENT.LIST.ADMIN',
        link: '',
        parentId: 3
      },
    ]
  },
  {
    id: 7,
    label: 'MENUITEMS.SCHEDULES.TEXT',
    icon: 'las la-user-nurse',
    link: '/admin/schedule',
  },
  {
    id: 8,
    label: 'MENUITEMS.MANAGEDEPARTMENT.TEXT',
    icon: 'mdi mdi-hospital-building',
  },
  {
    id: 9,
    label: 'MENUITEMS.MANAGEAPPOINTMENT.TEXT',
    icon: 'las la-calendar',
  },
  {
    id: 10,
    label: 'MENUITEMS.MEDICALPROCESS.TEXT',
    icon: 'las la-procedures',
    link: ''
  },
  {
    id: 11,
    label: 'MENUITEMS.ABOUTUS.TEXT',
    icon: 'las la-user-friends',
    link: ''
  },
  {
    id: 12,
    label: 'MENUITEMS.LOGOFF.TEXT',
    icon: 'las la-file-export',
    link:''
  }

];

export const MENU_DOCTOR: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'las la-tachometer-alt',
  },
  {
    id: 3,
    label: 'MENUITEMS.MANAGEAPPOINTMENT.TEXT',
    icon: 'las la-calendar',
    subItems: [
      {
        id: 4,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.ALL',
        link: '',
        parentId: 3
      },
      {
        id: 5,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.WAITING',
        link: '',
        parentId: 3
      },
      {
        id: 6,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.COMPLETE',
        link: '',
        parentId: 3
      },
      {
        id: 7,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.OUTOFDATE',
        link: '',
        parentId: 3
      },
      {
        id: 8,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CANCEL',
        link: '',
        parentId: 3
      },
    ]
  },
  {
    id: 9,
    label: 'MENUITEMS.SCHEDULEONSITE.TEXT',
    icon: 'las la-calendar-plus',
  },
  {
    id: 10,
    label: 'MENUITEMS.REPORT.TEXT',
    icon: 'las la-chart-bar',
    link: ''
  },
  {
    id: 11,
    label: 'MENUITEMS.MEDICALPROCESS.TEXT',
    icon: 'las la-procedures',
    link: ''
  },
  {
    id: 12,
    label: 'MENUITEMS.ABOUTUS.TEXT',
    icon: 'las la-user-friends',
    link: ''
  },
  {
    id: 13,
    label: 'MENUITEMS.SITEMAP.TEXT',
    icon: 'las la-sitemap',
    link: ''
  },
  {
    id: 14,
    label: 'MENUITEMS.HELP.TEXT',
    icon: 'las la-info-circle',
    link: ''
  },
  {
    id: 15,
    label: 'MENUITEMS.LOGOFF.TEXT',
    icon: 'las la-file-export',
    link:''
  }
];
