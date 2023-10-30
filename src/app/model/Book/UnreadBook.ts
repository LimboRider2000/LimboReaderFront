export class UnreadBook {
  get tittle(): string {
    return this._tittle;
  }

  set tittle(value: string) {
    this._tittle = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  get bookId(): string {
    return this._bookId;
  }

  set bookId(value: string) {
    this._bookId = value;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  private _bookId: string;
  private _page: number;
  private _path: string;
  private _author: string;
  private _tittle: string;

  toJSON() {
    return {
      bookId: this._bookId,
      page: this._page,
      path: this._path,
      author: this._author,
      tittle: this._tittle
    }
  }
}
