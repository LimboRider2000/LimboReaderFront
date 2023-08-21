export class  UserFormModel{
  get avatar(): File | null {
    return this._avatar;
  }

  set avatar(value: File | null) {
    this._avatar = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
  get login(): string {
    return this._login;
  }

  set login(value: string) {
    this._login = value;
  }
  private _login:string;
  private _password:string;
  private _email:string;
  private _name:string;
  private _avatar:File|null;

}
