export interface IUser {
  _id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  email?: string;
}
export class User {
  _id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  email?: string;

  public static createFromData(data: IUser): User {
    const user: User = new User();
    user._id = data._id;
    user.email = data.email;
    /// ...
    return user;
  }
}

// "_id": "6589324cb2b47b2575ee32d2",

// "first_name": "Aya",
//   "last_name": "John04",
//   "email": "admin@themesbrand.com",
//   "phone": 1234567890,
//   "password": "$2a$12$HwR9P10oCXakBjQs5C4WsufYANEhckalSHSWgD98Y9rlFXGG5h60y",
//   "role": "admin",
//   "confirm_password": "123456",
//   "changePasswordAt": "2022-04-18T06:46:23.839Z",
//   "skills": [
//       "LARAVEL",
//       "NODE"
//   ],
//   "__v": 1,
//   "Description": "\nHi I'm Anna Adame,It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.",
//   "city": "California",
//   "country": "United States",
//   "designation": "Lead Designer / Developer",
//   "joining_date": null,
//   "website": "www.velzon.com",
//   "zipcode": "90011",
//   "passwordtoken": "80cc100169155f677661ea0b622bc8f4a77dcfcc25eac3afd82ce54be48474dc",
//   "passwordtokenexp": "2024-02-13T13:07:11.315Z",
//   "exp_year": [],
//   "portfolio": []