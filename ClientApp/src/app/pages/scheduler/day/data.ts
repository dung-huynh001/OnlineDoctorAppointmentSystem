const Headers: {
  hours: string;
  desc: string;
}[] = [
  {
    hours: '7',
    desc: '07:00 - 07:59',
  },
  {
    hours: '8',
    desc: '08:00 - 08:59',
  },
  {
    hours: '9',
    desc: '09:00 - 09:59',
  },
  {
    hours: '10',
    desc: '10:00 - 10:59',
  },
  {
    hours: '11',
    desc: '11:00 - 11:59',
  },
  {
    hours: '12',
    desc: '12:00 - 12:59',
  },
  {
    hours: '13',
    desc: '13:00 - 13:59',
  },
  {
    hours: '14',
    desc: '14:00 - 14:59',
  },
  {
    hours: '15',
    desc: '15:00 - 15:59',
  },
  {
    hours: '16',
    desc: '16:00 - 17:59',
  },
  {
    hours: '17',
    desc: '17:00 - 17:59',
  },
  {
    hours: '18',
    desc: '18:00 - 18:59',
  },
  {
    hours: '19',
    desc: '19:00 - 19:59',
  },
  {
    hours: '20',
    desc: '20:00 - 20:59',
  },
  {
    hours: '21',
    desc: '21:00 - 21:59',
  },
  {
    hours: '22',
    desc: '22:00 - 22:59',
  },
];

const Doctors = [
  {
    fullName: 'Chi Dung',
    shifts: [
      { id: 1, shiftName: 'Morning Shift', start: '08:00', end: '11:00' },
      { id: 2, shiftName: 'Afternoon Shift', start: '13:30', end: '17:00' },
      { id: 3, shiftName: 'Night Shift', start: '18:30', end: '20:30' },
    ],
  },
  {
    fullName: 'Chi Dung',
    shifts: [
      { id: 4, shiftName: 'Morning Shift', start: '08:00', end: '11:00' },
      { id: 5, shiftName: 'Afternoon Shift', start: '13:30', end: '17:00' },
      { id: 6, shiftName: 'Night Shift', start: '18:30', end: '20:30' },
    ],
  },
  {
    fullName: 'Chi Dung',
    shifts: [
      { id: 7, shiftName: 'Morning Shift', start: '08:00', end: '11:00' },
      { id: 8, shiftName: 'Afternoon Shift', start: '13:30', end: '17:00' },
      { id: 8, shiftName: 'Night Shift', start: '18:30', end: '20:30' },
    ],
  },
  {
    fullName: 'Chi Dung',
    shifts: [
      { id: 10, shiftName: 'Morning Shift', start: '08:00', end: '11:00' },
      { id: 11, shiftName: 'Afternoon Shift', start: '13:30', end: '17:00' },
      { id: 12, shiftName: 'Night Shift', start: '18:30', end: '20:30' },
    ],
  },
];

export { Headers, Doctors };
