import {Genre} from "./Genre";

export class SubGenre {
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get sub_genre_name(): string {
    return this._sub_genre_name;
  }

  set sub_genre_name(value: string) {
    this._sub_genre_name = value;
  }
 private _id:string;
 private _sub_genre_name:string;

}
