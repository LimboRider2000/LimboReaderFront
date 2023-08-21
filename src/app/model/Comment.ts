import {User} from "./User/User";

export class Comment{
  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get bookArticle_id(): string {
    return this._bookArticle_id;
  }

  set bookArticle_id(value: string) {
    this._bookArticle_id = value;
  }

  get userObj(): User {
    return this._userObj;
  }

  set userObj(value: User) {
    this._userObj = value;
  }

  get dateTime(): string {
    return this._dateTime;
  }

  set dateTime(value: string) {
    this._dateTime = value;
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }
  private _id:string;
  private _bookArticle_id:string;
  private _user:string
  private _userObj:User;
  private _dateTime:string;
  private _comment:string;

}
