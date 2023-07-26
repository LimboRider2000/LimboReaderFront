import {Genre} from "./Genre";
import {SubGenre} from "./SubGenre";

export class GenreSubgenreItem {
  get genre(): Genre {
    return this._genre;
  }

  set genre(value: Genre) {
    this._genre = value;
  }


  get subGenreCollection(): SubGenre[] {
    return this._subGenreCollection;
  }

  set subGenreCollection(value: SubGenre[]) {
    this._subGenreCollection = value;
  }

  private _genre: Genre;
   private _subGenreCollection:SubGenre[] = [];
}
