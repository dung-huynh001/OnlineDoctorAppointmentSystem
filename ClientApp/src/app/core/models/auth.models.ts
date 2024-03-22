export interface IUser {
  id?: string;
  userName?: string;
  fullName?: string;
  userType?: string;
  avatarUrl?: string;
  status?: string;
  token?: string;
}
export class User {
  id?: string;
  userName?: string;
  fullName?: string;
  userType?: string;
  avatarUrl?: string;
  status?: string;
  token?: string;

  public static createFromData(data: IUser): User {
    const user: User = new User();
    user.id = data.id;
    user.userName = data.userName;
    user.fullName = data.fullName;
    user.userType = data.userType;
    user.avatarUrl = data.avatarUrl;
    user.status = data.status;
    user.token = data.token;
    return user;
  }
}