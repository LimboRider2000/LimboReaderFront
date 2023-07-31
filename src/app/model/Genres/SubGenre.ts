import {Genre} from "./Genre";

export class SubGenre {
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get subGenreName(): string {
    return this._subGenreName;
  }

  set subGenreName(value: string) {
    this._subGenreName = value;
  }
 private _id:string;
 private _subGenreName:string;

}
