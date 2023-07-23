export  class User{
  get avatarPath(): string {
    return this._AvatarPath;
  }

  set avatarPath(value: string) {
    this._AvatarPath = value;
  }
  get name(): string | null {
    return this._Name;
  }

  set name(value: string | null) {
    this._Name = value;
  }
  get avatar(): File|null {
    return this._Avatar;
  }

  set avatar(value: File|null) {
    this._Avatar = value;
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
  private _Avatar:File|null;
  private _AvatarPath :string;
  private _Name:string|null;


}

