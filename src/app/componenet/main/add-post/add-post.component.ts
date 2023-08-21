import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FileValidationService} from "../../../Servises/FileService/file-validation.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenreSubgenreItem} from "../../../model/Genres/GenreSubgenreItem";
import {SubGenre} from "../../../model/Genres/SubGenre";
import {  GenreSubGenreCollectionService} from "../../../Servises/DataService/GenreServices/GenreSubGenreCollectionService";
import {BookPostService} from "../../../Servises/DataService/Book-post/book-post.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  failValidationService = inject(FileValidationService)

  @ViewChild("avatarUpload") avatarUpload: ElementRef
  @ViewChild("bookUpload") bookUpload: ElementRef

  title: string;
  previewTittleImg: string | ArrayBuffer | null;
  message: string = ""
  addNewPostForm: FormGroup;
  private genreSubgenreService = inject(GenreSubGenreCollectionService)
  private bookService = inject(BookPostService)

  GenreAndSubGenreCollection: GenreSubgenreItem[];
  subGenreSelectList: SubGenre[];

  ngOnInit(): void {
    this.genreSubgenreService.getGenreCollectionObservable().subscribe(
      (data: GenreSubgenreItem[]) => {
        this.GenreAndSubGenreCollection = data;
        this.subGenreSelectList = this.GenreAndSubGenreCollection[0].subGenreCollection
      }
    )
  }

  constructor(public fb: FormBuilder) {
    this.addNewPostForm = this.fb.group(
      {
        titleImgFile: [null],
        authorLastName:[""],
        authorName:[""],
        extensionTitleImg: [""],
        tittle: ["", [Validators.required]],
        description: ["", [Validators.required]],
        genre: [null, [Validators.required]],
        subGenre: [null, [Validators.required]],
        bookFile: [null, [Validators.required]],
        extensionBook: [""],
        userId:[""]
      }
    )
  }

  TitleFileInput(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    const fileExtension = file.name.split('.').pop();
    this.addNewPostForm.patchValue({extensionTitleImg: fileExtension})

    this.message = this.failValidationService.isFileValid(file, 12000000)
    if (this.message !== "") return

    const reader = new FileReader();
    reader.onload = () => {
      this.previewTittleImg = reader.result;
      this.addNewPostForm.patchValue({titleImgFile: reader.result});
    }
    reader.readAsDataURL(file)
  }

  submit() {
    let  userid = sessionStorage.getItem("Id");
    if(userid === null){
      userid = localStorage.getItem("Id");
    }
    if(userid === null){
      this.message = "проблемы с данными пользователя пожалуйста выйдите и авторизируйтесь еще раз"
      return
    }

    this.addNewPostForm.patchValue({userId : userid})
    const formData = new FormData()
    for (let key  of Object.keys( this.addNewPostForm.controls) ) {
          const value = this.addNewPostForm.get(key)?.value
        formData.append(key,value);
    }

    this.bookService.newPostAdd(formData).subscribe(
      (data: any) => {
        this.bookService.addToCollection(data)
      },
      (error) => console.log(error)
    )
  }

  BookFileInput($event: Event) {
    const bookFile = ($event.target as HTMLInputElement).files![0];
    const fileExtension = bookFile.name.split('.').pop();
    this.addNewPostForm.patchValue({extensionBook: fileExtension})
    const reader = new FileReader();
    reader.onload = () => {

      this.addNewPostForm.patchValue({bookFile: reader.result});
    }
    reader.readAsDataURL(bookFile)
  }

  formReset() {
    this.avatarUpload.nativeElement.value = null;
    this.bookUpload.nativeElement.value = null
    this.addNewPostForm.reset();
  }

  SelectGenre($event: Event) {
    if (this.subGenreSelectList !== undefined && this.subGenreSelectList.length > 0) {
      this.subGenreSelectList.splice(0);
    }
    this.GenreAndSubGenreCollection.forEach(item => {
      if (item.genre.id === ($event.currentTarget as HTMLInputElement).value) {
        this.subGenreSelectList = item.subGenreCollection
      }
    })
  }
}
