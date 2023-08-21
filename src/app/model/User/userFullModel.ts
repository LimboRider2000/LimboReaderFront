import {User} from "./User";

export class UserFullModel extends User{
    private _registerDt: string | Date;
    private _lastLoginDt:string | Date;
    private _active:boolean;
    private _activateCode: string;

  get registerDt(): string | Date {
    return this._registerDt;
  }

  set registerDt(value: string|Date) {
    this._registerDt = value;
  }

  get lastLoginDt(): string|Date {
    return this._lastLoginDt;
  }

  set lastLoginDt(value: string|Date) {
    this._lastLoginDt = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get activateCode(): string {
    return this._activateCode;
  }

  set activateCode(value: string) {
    this._activateCode = value;
  }
}
