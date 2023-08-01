import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RedirectService {
  constructor(private router: Router) {}

  redirectToPageAfterDelay(delayInSeconds: number, pageUrl: string): void {
    setTimeout(() => {
      this.router.navigate([pageUrl]);
    }, delayInSeconds * 1000);
  }
}
