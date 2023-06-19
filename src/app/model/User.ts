export  class User{
  get Avatar(): string |null {
    return this._Avatar;
  }

  set Avatar(value: string |null) {
    this._Avatar = value;
  }
  get UserRole(): string{
    return this._UserRole;
  }

  set UserRole(value: string) {
    this._UserRole = value;
  }
  get Salt(): string|null {
    return this._Salt;
  }

  set Salt(value: string|null) {
    this._Salt = value;
  }
  get Password(): string|null {
    return this._Password;
  }

  set Password(value: string |null) {
    this._Password = value;
  }
  get Email(): string|null {
    return this._Email;
  }

  set Email(value: string|null) {
    this._Email = value;
  }
  get Login(): string {
    return this._Login;
  }

  set Login(value: string) {
    this._Login = value;
  }
  get Id(): string {
    return this.id;
  }

  set Id(value: string) {
    this.id = value;
  }

  private id:string;
  private _Login:string;
  private _Email:string|null;
  private _Password:string | null;
  private _Salt:string|null;
  private _UserRole:string;
  private _Avatar:string|null;
}

