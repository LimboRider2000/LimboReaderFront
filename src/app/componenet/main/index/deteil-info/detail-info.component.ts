import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {of, Subscription, switchMap} from "rxjs";
import {BookPostService} from "../../../../Servises/DataService/Book-post/book-post.service";
import {Book} from "../../../../model/Book/Book";
import {serverAddress} from "../../../../Servises/DataService/ServerAddress";
import {FormatDataStringService} from "../../../../Servises/format-data-string.service";
import {FileBookDownloadServiceService} from "../../../../Servises/FileService/file-book-download-service.service";

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit{
  ngOnInit(): void {
    this.subscription = this.activateRouter.params.pipe(
      switchMap(param=>
      {this.id = param['id']
        const dataSessionSt = sessionStorage.getItem('currentBook')
        if(dataSessionSt){
          this.currentBook = JSON.parse(dataSessionSt)
          return of(null)
        }else
            return this.bookService.getBuId(this.id!)
      })
    ).subscribe(
            (data:any)=>{
              if(data)
                this.currentBook = data
                sessionStorage.setItem("currentBook",JSON.stringify(this.currentBook))
            },
            (error)=> console.log(error))
  }
  id?: string
  private subscription: Subscription
  public currentBook: Book;
  public dateService : FormatDataStringService = inject(FormatDataStringService);
  private activateRouter = inject(ActivatedRoute)
  private bookService = inject(BookPostService)
  private downloadService = inject(FileBookDownloadServiceService)

  protected readonly serverAddress = serverAddress;
  protected readonly console = console;

  download(id: string,extension:string) {
    this.downloadService.downloadBookFile(id,extension).subscribe(
      (response:any)=>{
        let filename = response.headers.get("content-disposition")?.split(";")[1].split("=")[1]
        let blob : Blob = response.body as Blob
        let a = document.createElement("a");

        filename = new TextDecoder().decode(new Uint8Array([...atob(decodeURIComponent(filename))].map(char => char.charCodeAt(0))));
        if(filename != "") {
          a.download =filename
            a.href = window.URL.createObjectURL(blob)
          a.click()
        }
      },error =>  console.error(error)
    )
  }
}

//085a6fef-5195-4fd2-aba2-aecf04e400e4
//TODO : сделать защиту от ввода id непосредственно в url чтобы не было гонок в БД
