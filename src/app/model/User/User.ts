export  class  User{
  get avatar(): string {
    return <string>this._avatar;
  }
  set avatar(value: string) {
    this._avatar = value;
  }
  get name(): string | null {
    return this._Name;
  }

  set name(value: string | null) {
    this._Name = value;
  }
  get userRole(): string{
    return this._UserRole;
  }

  set userRole(value: string) {
    this._UserRole = value;
  }
  get passwordHash(): string {
    return this._Password;
  }
  set passwordHash(value: string) {
    this._Password = value;
  }
  get email(): string{
    return this._Email;
  }
  set email(value: string) {
    this._Email = value;
  }
  get login(): string {
    return this._Login;
  }

  set login(value: string) {
    this._Login = value;
  }
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }


  private _id:string;
  private _Login:string;
  private _Email:string;
  private _Password:string;
  private _UserRole:string;
  private _avatar? :string;
  private _Name:string|null;
}

