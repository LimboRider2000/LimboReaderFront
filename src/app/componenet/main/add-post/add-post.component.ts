import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FileValidationService} from "../../../Servises/FileService/file-validation.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenreSubgenreItem} from "../../../model/Genres/GenreSubgenreItem";
import {SubGenre} from "../../../model/Genres/SubGenre";
import {  GenreSubGenreCollectionService} from "../../../Servises/DataService/GenreServices/GenreSubGenreCollectionService";
import {BookPostService} from "../../../Servises/DataService/Book-post/book-post.service";
import {MatDialog} from "@angular/material/dialog";
import {InfoPopUpComponent} from "../../allPopUp/info-pop-up/info-pop-up.component";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  failValidationService = inject(FileValidationService)

  @ViewChild("titleBook") titleBook: ElementRef
  @ViewChild("bookUpload") bookUpload: ElementRef

  title: string;
  previewTittleImg: string | ArrayBuffer | null;
  message: string = ""
  addNewPostForm: FormGroup;
  private genreSubgenreService = inject(GenreSubGenreCollectionService)
  private bookService = inject(BookPostService)
  private dialog = inject(MatDialog)
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
        tittle: ["", [Validators.required],],
        description: ["", [Validators.required]],
        genre: [null, [Validators.required]],
        subGenre: [null, [Validators.required]],
        bookFileList :this.fb.array([]),
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

  submit($event:Event) {
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
      let value :any= null;
      if(key!== "bookFileList"){
           value = this.addNewPostForm.get(key)?.value
          value = value.trim()  as String
      }else{
        const fileArr = this.addNewPostForm.get(key) as FormArray;
        fileArr.controls.forEach((fileArr)=>{
          formData.append(key, fileArr.value);
        })

      }
        formData.append(key,value);
    }

     this.bookService.newPostAdd(formData).subscribe(
       (data: any) => {
         this.bookService.addToCollection(data)
         this.formReset($event)
         this.dialog.open(InfoPopUpComponent, {
           width: "auto",
           enterAnimationDuration: 100,
           exitAnimationDuration: 300,
           data: {
             title: "Сообщение",
             message: "Книга добавлена успешно",
             isSuccess : true
           }
         });
       },
       (error) => {
         this.dialog.open(InfoPopUpComponent, {
           width: "auto",
           enterAnimationDuration: 300,
           exitAnimationDuration: 300,
           data: {
             title: "Сообщение",
             message: "Проблемы с добавлением файла",
             isSuccess : false
           }
         });
       }
     )
  }

  BookFileInput($event: Event) {
    const bookFileList = ($event.target as HTMLInputElement).files;
    const fileControls = this.addNewPostForm.get("bookFileList") as FormArray;
    if(bookFileList) {
      for (let i = 0; i < bookFileList.length; i++) {
       fileControls.push(this.fb.control(bookFileList[i]))
      }
      console.log(this.addNewPostForm)
      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.addNewPostForm.setValue(bookFileLit.bookFileList);
      // }
      //
    }
  }

  formReset($event: Event) {
    $event.preventDefault()
    this.titleBook.nativeElement.value =null;
    this.bookUpload.nativeElement.value = null;
    this.previewTittleImg = null;
    this.addNewPostForm.reset(
      {authorLastName: [""],
        authorName:[""],
        extensionTitleImg:[""],
        tittle:[""],
        description:[""],
        bookFileList:this.fb.array([]),
        titleImgFile:[null],
        userId:[""]});
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
