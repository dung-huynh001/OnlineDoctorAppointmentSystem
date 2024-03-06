export interface IUser {
  id?: string;
  username?: string;
  fullName?: string;
  userType?: string;
  avatarUrl?: string;
  token?: string;
}
export class User {
  id?: string;
  username?: string;
  fullName?: string;
  userType?: string;
  avatarUrl?: string;
  token?: string;

  public static createFromData(data: IUser): User {
    const user: User = new User();
    user.id = data.id;
    user.username = data.username;
    user.fullName = data.fullName;
    user.userType = data.userType;
    user.avatarUrl = data.avatarUrl;
    user.token = data.token;
    return user;
  }
}

export class Unauthorize{
  message?: string;
  statusCode?: string;
}