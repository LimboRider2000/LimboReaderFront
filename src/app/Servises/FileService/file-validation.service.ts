import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileValidationService {

  constructor() { }

  isFileValid(file:File,fileMaxsize:number):string{
    if (file.size > fileMaxsize) {
      return 'Размер файла превышает максимальный предел (50 кб).';
    }
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = file.name.toLowerCase().split('.').pop();
    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      return 'Недопустимое расширение файла. Загрузите файл в формате JPG, JPEG или PNG.';
    }
  return ""
}
}
