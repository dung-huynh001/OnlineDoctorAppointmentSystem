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
    link: '/patient/dashboard'
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
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.PENDING',
        link: '/patient/appointment/pending',
        parentId: 4
      },
      {
        id: 7,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CONFIRMED',
        link: '/patient/appointment/confirmed',
        parentId: 4
      },
      {
        id: 8,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.COMPLETE',
        link: '/patient/appointment/completed',
        parentId: 4
      },
      {
        id: 9,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.OUTOFDATE',
        link: '/patient/appointment/out-of-date',
        parentId: 4
      },
      {
        id: 10,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CANCEL',
        link: '/patient/appointment/cancelled',
        parentId: 4
      },
    ]
  },
  {
    id: 11,
    label: 'MENUITEMS.SCHEDULEOFDOCTOR.TEXT',
    icon: 'las la-user-nurse',
    link: '/patient/schedule-of-doctors'
  },
  {
    id: 12,
    label: 'MENUITEMS.MEDICALPROCESS.TEXT',
    icon: 'las la-procedures',
    link: '/medical-process'
  },
  {
    id: 13,
    label: 'MENUITEMS.ABOUTUS.TEXT',
    icon: 'las la-user-friends',
    link: '/about'
  },
  {
    id: 14,
    label: 'MENUITEMS.HELP.TEXT',
    icon: 'las la-info-circle',
    link: '/help'
  },
  {
    id: 15,
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
    link: '/admin/dashboard'
  },
  {
    id: 3,
    label: 'MENUITEMS.USERMANAGEMENT.TEXT',
    icon: 'las la-users',
    subItems: [
      {
        id: 4,
        label: 'MENUITEMS.USERMANAGEMENT.LIST.PATIENT',
        link: '/admin/manage-patient',
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
    link: '/admin/manage-department'
  },
  {
    id: 9,
    label: 'MENUITEMS.MANAGEAPPOINTMENT.TEXT',
    icon: 'las la-calendar',
    subItems: [
      {
        id: 10,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.ALL',
        link: '/admin/appointment/all',
        parentId: 9
      },
      {
        id: 11,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.PENDING',
        link: '/admin/appointment/pending',
        parentId: 9
      },
      {
        id: 12,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CONFIRMED',
        link: '/admin/appointment/confirmed',
        parentId: 9
      },
      {
        id: 13,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.COMPLETE',
        link: '/admin/appointment/completed',
        parentId: 9
      },
      {
        id: 14,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.OUTOFDATE',
        link: '/admin/appointment/out-of-date',
        parentId: 9
      },
      {
        id: 15,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CANCEL',
        link: '/admin/appointment/cancelled',
        parentId: 9
      },
    ]
  },
  {
    id: 16,
    label: 'MENUITEMS.MEDICALPROCESS.TEXT',
    icon: 'las la-procedures',
    link: '/medical-process'
  },
  {
    id: 17,
    label: 'MENUITEMS.ABOUTUS.TEXT',
    icon: 'las la-user-friends',
    link: '/about'
  },
  {
    id: 18,
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
    link: '/doctor/dashboard'
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
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.PENDING',
        link: '',
        parentId: 3
      },
      {
        id: 6,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CONFIRMED',
        link: '',
        parentId: 3
      },
      {
        id: 7,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.COMPLETE',
        link: '',
        parentId: 3
      },
      {
        id: 8,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.OUTOFDATE',
        link: '',
        parentId: 3
      },
      {
        id: 9,
        label: 'MENUITEMS.MANAGEAPPOINTMENT.LIST.CANCEL',
        link: '',
        parentId: 3
      },
    ]
  },
  {
    id: 10,
    label: 'MENUITEMS.SCHEDULEONSITE.TEXT',
    icon: 'las la-calendar-plus',
    link: ''
  },
  {
    id: 11,
    label: 'MENUITEMS.REPORT.TEXT',
    icon: 'las la-chart-bar',
    link: '/report'
  },
  {
    id: 12,
    label: 'MENUITEMS.MEDICALPROCESS.TEXT',
    icon: 'las la-procedures',
    link: '/medical-process'
  },
  {
    id: 13,
    label: 'MENUITEMS.ABOUTUS.TEXT',
    icon: 'las la-user-friends',
    link: '/about'
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
