import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDataStringService {
  formatData(date: string) {
    if (date === undefined || date === "" || date === null) return "";
    const dateFormatter = new Date(date)
    const localData = dateFormatter.toLocaleDateString()
    const localTime = dateFormatter.toLocaleTimeString()
    return localData + " " + localTime
  }
}
