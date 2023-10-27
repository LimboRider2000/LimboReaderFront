import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { map, Observable, Subscription} from "rxjs";
import {GenreSubgenreItem} from "../../../model/Genres/GenreSubgenreItem";
import {  GenreSubGenreCollectionService} from "../../../Servises/DataService/GenreServices/GenreSubGenreCollectionService";
import {SubGenre} from "../../../model/Genres/SubGenre";
import {Book} from "../../../model/Book/Book";
import {ActivatedRoute} from "@angular/router";
import {BookPostService} from "../../../Servises/DataService/Book-post/book-post.service";
import { serverAddress } from 'src/app/Servises/DataService/ServerAddress';
import {Genre} from "../../../model/Genres/Genre";
import {FileBookDownloadService} from "../../../Servises/FileService/file-book-download.service";
import {MatDialog} from "@angular/material/dialog";
import {InfoPopUpComponent} from "../../allPopUp/info-pop-up/info-pop-up.component";
import {ConfirmPopupComponent} from "../../allPopUp/comform-popup/confirm-popup.component";
import {FileValidationService} from "../../../Servises/FileService/file-validation.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit,OnDestroy {

  private readonly fileService: FileBookDownloadService = inject(FileBookDownloadService)
  private readonly activeRouter: ActivatedRoute = inject(ActivatedRoute)
  private readonly bookService = inject(BookPostService)
  private readonly genreService = inject(GenreSubGenreCollectionService);
  private readonly modal = inject(MatDialog)
  private readonly TitleValidation = inject(FileValidationService)

  genreAndSubGenreCollection$: Observable<GenreSubgenreItem[]> = this.genreService.getGenreCollectionObservable();
  userBookCollection$: Observable<Book[]> = this.bookService.getUserBookCollectionObservable();

  editBook: Book;
  editBookFormGroup: FormGroup;
  message: string = "";
  previewTittleImg: any;
  subGenreCollection: SubGenre[] = [];
  public selectedGenre: Genre;
  public selectedSubGenre: SubGenre;

  public fileExtExist = new Map<string, boolean>([
    ["pdf", false],
    ["epub", false],
    ["fb2", false],
  ])

  @ViewChild("btnDis") btnDis :ElementRef<HTMLButtonElement>;
  private subs: Subscription;
  private genreSubs: Subscription;
  pdfFileName: string;
  epubFileName: string;
  fb2FileName: string;
  fileControl: FormArray

  constructor(private readonly fb: FormBuilder) {
    this.editBookFormGroup = this.fb.group(
      {
        authorLastName: ["", [Validators.required]],
        authorName: ["", [Validators.required]],
        authorId:[""],
        bookFileList: this.fb.array([]),
        description: ["", [Validators.required]],
        extensionTitleImg: ["", [Validators.required]],
        genre: new FormControl(''),
        idBook: [""],
        isTitleImgChange: ["false"],
        subGenre: ['', [Validators.required]],
        titleImgFile: [""],
        title: ["", [Validators.required],],
        userId: [""]
      })
  }

  ngOnInit(): void {
    let userBook: Subscription;
    this.subs = this.activeRouter.params.pipe(
      map(param => {
        userBook = this.userBookCollection$.pipe(
          map(item => item.map(book => {
            if (book.id == param["id"]) {
              this.editBook = book
            }
          }))
        ).subscribe()
      })
    ).subscribe(() => {

      userBook.unsubscribe()

      this.fileService.checkFilesForExtension(this.editBook.filePath).subscribe(
        (data: any) => {
          for (const [ext, value] of Object.entries(data)) {
            if (this.fileExtExist.has(ext)) {
              this.fileExtExist.set(ext, value as boolean);
            }
          }
        },
        error => {
          console.error(error.error)
        }
      )
      this.genreAndSubGenreCollection$.pipe(
        map(collection =>
          collection.map(genre => {
            if (genre.genre.genreName === this.editBook.genre_name) {
              this.selectedGenre = genre.genre;
              this.subGenreCollection = genre.subGenreCollection;
              genre.subGenreCollection.map(
                subGenre => {
                  if (subGenre.subGenreName === this.editBook.subGenre_name)
                    this.selectedSubGenre = subGenre;
                })
            }
          }))
      ).subscribe(
        () => {
          if (this.editBook != null) {
            this.previewTittleImg = serverAddress + this.editBook.titleImgPath

            this.editBookFormGroup
              .get("idBook")?.setValue(this.editBook.id)
            this.editBookFormGroup
              .get("titleImgFile")?.setValue(this.previewTittleImg)
            this.editBookFormGroup
              .get("authorLastName")?.setValue(this.editBook.author.lastName)
            this.editBookFormGroup
              .get("authorName")?.setValue(this.editBook.author.name)
            this.editBookFormGroup
              .get("authorId")?.setValue(this.editBook.author.id)
            this.editBookFormGroup
              .get("extensionTitleImg")
              ?.setValue(serverAddress + this.editBook.titleImgPath)
            this.editBookFormGroup
              .get("title")?.setValue(this.editBook.title)
            this.editBookFormGroup
              .get("description")?.setValue(this.editBook.description)
            this.editBookFormGroup
              .get('genre')?.setValue(this.selectedGenre.id)
            this.editBookFormGroup
              .get("subGenre")?.setValue(this.selectedSubGenre.id)
            this.editBookFormGroup
              .get("userId")?.setValue(sessionStorage.getItem('id'))
          }
        }
      )
    })
  }

  ngOnDestroy(): void {
    if(this.subs)
    this.subs.unsubscribe()
    if(this.genreSubs)
    this.genreSubs.unsubscribe()
  }

  submit(event:any) {
    event.preventDefault();
    this.btnDis.nativeElement.disabled=true;
    const formData = new FormData()
    for (let key  of Object.keys( this.editBookFormGroup.controls) ) {
      let value :any=  null;
      if(key!== "bookFileList"){
        value = this.editBookFormGroup.get(key)?.value
        value = value.trim()  as String
      }else{
        const fileArr = this.editBookFormGroup.get(key) as FormArray;
        fileArr.controls.forEach((fileArr)=>{
          formData.append(key, fileArr.value);
        })

      }
      formData.append(key,value);
    }
    this.bookService.editService(formData).subscribe({
      next: ()=>this.modalInfoMessage("Редактирование успешно",true),
      error:()=>this.modalInfoMessage("Ошибка: на сервере",false),
      complete:()=> this.btnDis.nativeElement.disabled = false
    })
  }

  TitleFileInputChange(event:any) {
    const file =
      (event.target as HTMLInputElement).files;

    if(file != null){
      const fileExtension =
        file[0].name.split('.').pop();

      const message =this.TitleValidation
        .isFileValid(file[0],1024*100)

      if(message !== ""){
        const treed =
          this.modalInfoMessage(
            "Ошибка валидации файла",
            false)
        treed.afterClosed().subscribe()
      }

      this.editBookFormGroup
      .get("extensionTitleImg")?.setValue(fileExtension)
      this.editBookFormGroup.get("isTitleImgChange")?.setValue("true")
      const reader = new FileReader();
      reader.onload = () => {
        this.previewTittleImg = reader.result;
        this.editBookFormGroup.patchValue({titleImgFile: reader.result});
      }
      reader.readAsDataURL(file[0])
    }
  }
  setSubGenreList(event: any) {
    let genreId = (event.target as HTMLInputElement).value

    this.genreSubs = this.genreAndSubGenreCollection$.pipe(
      map(item => item.map(
        genre => {
          if (genre.genre.id === genreId) {
            this.subGenreCollection = genre.subGenreCollection
          }
          return null
        }))).subscribe()
  }
  inputFileClick(ext:string, event:any){
      if (this.fileExtExist.get(ext)) {
        if(event.isTrusted) {
          event.preventDefault()
          const modalTemp =
            this.modal.open(ConfirmPopupComponent, {
              width: "auto",
              enterAnimationDuration: 100,
              exitAnimationDuration: 300,
              data: {
                title: "Файл",
                message: "Файл с таким расширением уже существует вы хотите заменить?",
                buttonAction: "Да"
              }
            })
          modalTemp.afterClosed().subscribe(
            (data: any) => {
              if (data === "ok") {
                event.target.click()
                //this.fileEpubInput.nativeElement.click()
              } else {
                event.preventDefault()
              }
            }
          )
        }
      }
        event.target.click()
  }
  setFileName(fileTooSet: string, event: any) {
    const fileName = (event.target as HTMLInputElement).files![0].name
    const ext= fileName.substring(fileName.lastIndexOf(".")+1)
    if(!this.fileExtExist.has(ext)){
      const treed =
        this.modalInfoMessage(
          "Не правильное расширение файла",
          false)
      treed.afterClosed().subscribe()
    }else {
      switch (fileTooSet) {
        case 'epub':
          this.epubFileName = (event.target as HTMLInputElement).files == null ?
            "" : (event.target as HTMLInputElement).files![0].name
          break
        case 'pdf':
          this.pdfFileName = (event.target as HTMLInputElement).files == null ?
            "" : (event.target as HTMLInputElement).files![0].name
          break
        case 'fb2':
          this.fb2FileName = (event.target as HTMLInputElement).files == null ?
            "" : (event.target as HTMLInputElement).files![0].name
          break

      }
      this.fileControl = this.editBookFormGroup.get("bookFileList") as FormArray
      const file = ( event.target as HTMLInputElement).files![0];
      this.fileControl.push(this.fb.control(file))
      this.editBookFormGroup.get("bookFileList")?.setValue(this.fileControl);
    }
  }
  modalInfoMessage(message:String,isPositive:boolean){
  return  this.modal.open(InfoPopUpComponent, {
      width: "auto",
      enterAnimationDuration: 100,
      exitAnimationDuration: 300,
      data: {
        title: isPositive?"Успех":"Ошибка!",
        message: message,
        isSuccess: isPositive
      }
    })
  }


}
