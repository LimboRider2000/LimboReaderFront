import {UnreadBook} from "./UnreadBook";

export class UnreadBookCollection{

  private _collection: UnreadBook[]
  get collection(): UnreadBook[] {
    return this._collection;
  }

  set collection(value: UnreadBook[]) {
    this._collection = value;
  }
  toJSON(){
    return {
      collection:this._collection
    }
  }
}
