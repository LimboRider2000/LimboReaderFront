import {Component, HostListener, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {of, Subscription, switchMap} from "rxjs";
import {BookPostService} from "../../../Servises/DataService/Book-post/book-post.service";
import {Book} from "../../../model/Book/Book";
import {serverAddress} from "../../../Servises/DataService/ServerAddress";
import {FormatDataStringService} from "../../../Servises/format-data-string.service";
import {FileBookDownloadService} from "../../../Servises/FileService/file-book-download.service";
import {MatDialog} from "@angular/material/dialog";
import {InfoPopUpComponent} from "../../allPopUp/info-pop-up/info-pop-up.component";
import {Comment} from "../../../model/Comment"
import {CommentService} from "../../../Servises/DataService/comment.service";

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.commentService.number$.subscribe((number)=> this.commentCount = number)
    this.subscription = this.activateRouter.params.pipe(
      switchMap(param => {
        this.id = param['id']
        const dataSessionSt = sessionStorage.getItem('currentBook')
        if (dataSessionSt != null && dataSessionSt !== "undefined") {
          const bookInStorage: Book = JSON.parse(dataSessionSt)
          if (bookInStorage.id == this.id) {
            this.currentBook = bookInStorage
            this.intiComment();
            return of(null)
          } else
            return this.bookService.getBuId(this.id!)
        }
        return this.bookService.getBuId(this.id!)
      })
    ).subscribe(
      (data: any) => {
        if (data) {
          this.currentBook = data
          sessionStorage.setItem("currentBook", JSON.stringify(this.currentBook))
          this.intiComment();
        }
      },
      (error) => {
        this.showErrorMessage(error)
      })
  }

  public currentBook: Book;
  public commentCollection: Comment[];

  public readonly dateService: FormatDataStringService = inject(FormatDataStringService);

  private readonly activateRouter = inject(ActivatedRoute)
  private readonly bookService = inject(BookPostService)
  private readonly fileCheck = inject(FileBookDownloadService)
  private readonly downloadService = inject(FileBookDownloadService)
  private readonly commentService = inject(CommentService);
  private readonly route = inject(Router)
  private readonly dialog = inject(MatDialog)

  private id?: string
  private subscription: Subscription
  private commentCount:number;
  private commentSlice:number = 0;
  private eventScroll = true;

  protected readonly serverAddress = serverAddress;


  intiComment() {
    this.commentService.getCommentCollection(this.currentBook.id, this.commentSlice)
    this.commentService.getCollectionAsObserver().subscribe(
      (data) => {
        this.commentCollection = data;
      }
    )
  }

  download(id: string, extension: string) {
    this.downloadService.downloadBookFile(id, extension).subscribe(
      (response: any) => {
        let filename = response.headers.get("content-disposition")?.split(";")[1].split("=")[1]
        let blob: Blob = response.body as Blob
        let a = document.createElement("a");

        filename = new TextDecoder().decode(new Uint8Array([...atob(decodeURIComponent(filename))].map(char => char.charCodeAt(0))));
        if (filename != "") {
          a.download = filename
          a.href = window.URL.createObjectURL(blob)
          a.click()
        }
      }, error => {
        this.showErrorMessage(error)
      }
    )
  }

  showErrorMessage(data: any) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataAsString = reader.result as string;
      this.openDialog(dataAsString)
    };
    reader.readAsText(data.error)
  }

  private openDialog(dataAsString: string) {
    this.dialog.open(InfoPopUpComponent, {
      width: "auto",
      enterAnimationDuration: 100,
      exitAnimationDuration: 300,
      data: {
        title: "Сообщение",
        message: dataAsString,
        isSuccess: false
      }
    });

  }

  checkExitBook() {
    this.fileCheck.checkFileExist(this.currentBook.filePath).subscribe(
      (data) => {
        if (data) {
          this.route.navigateByUrl("/reader",
            {
              state:
                {
                  path: this.currentBook.filePath,
                  title: this.currentBook.title,
                  author: this.currentBook.author,
                  id: this.currentBook.id,

                }
            })
        }

      }, error => this.openDialog(error.error)
    )
  }


  ngOnDestroy(): void {
    this.commentService.Destroy()
  }

  @HostListener('window:scroll',['$event'])
  public onViewportScroll(event:Event) {
    event.preventDefault()

    if(this.commentCollection!= null && this.commentCollection.length > 0 && this.commentCollection.length < this.commentCount) {
      const scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      let body = document.body
      const bottomOfPage = Math.max( body.scrollHeight, body.offsetHeight);
      let ancore = bottomOfPage - 1100;
      if( scrollTop>= ancore){

        if(this.eventScroll){
        this.commentService.getCommentCollection(this.currentBook.id, (this.commentSlice+= 10))
        this.commentService.getCollectionAsObserver().subscribe(
          (data) => {
            this.commentCollection = data
            setTimeout(()=>this.eventScroll = true,2000)
          }
        )
      }
        this.eventScroll = false;
    }
  }
  }
}

//085a6fef-5195-4fd2-aba2-aecf04e400e4
//TODO : сделать защиту от ввода id непосредственно в url чтобы не было гонок в БД
