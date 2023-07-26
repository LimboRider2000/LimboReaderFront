export  class  Genre {
  get id(): string {
    return this._id;
  }

  set id(value: string){
    this._id = value;
  }

  get genreName(): string {
    return this._genreName;
  }

  set genreName(value: string) {
    this._genreName = value;
  }
  private _id :string;
  private _genreName:string;
}
