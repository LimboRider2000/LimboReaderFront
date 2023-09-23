import {Authors} from "../Author/Authors";
export class Book{
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get user_name(): string {
    return this._user_name;
  }

  set user_name(value: string) {
    this._user_name = value;
  }

  get titleImgPath(): string {
    return this._titleImgPath;
  }

  set titleImgPath(value: string) {
    this._titleImgPath = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get filePath(): string {
    return this._filePath;
  }

  set filePath(value: string) {
    this._filePath = value;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  set createdDate(value: string) {
    this._createdDate = value;
  }

  get author(): Authors {
    return this._author;
  }

  set author(value: Authors) {
    this._author = value;
  }
  get genre_name(): string {
    return this._genre_name;
  }
  set genre_name(value: string) {
    this._genre_name = value;
  }
  get subGenre_name(): string {
    return this._subGenre_name;
  }

  set subGenre_name(value: string) {
    this._subGenre_name = value;
  }
  get rating(): number {
    return this._rating;
  }
  set rating(value: number) {
    this._rating = value;
  }
private _id :string
private _user_name:string;
private _titleImgPath:string
private _title:string ;
private _description:string;
private _filePath :string;
private _createdDate:string;
private _author:Authors;
private _genre_name:string;
private _subGenre_name:string;
private _rating:number;


}
