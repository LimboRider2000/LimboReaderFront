import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPostSmallComponent } from './book-post-small.component';

describe('BookPostSmallComponent', () => {
  let component: BookPostSmallComponent;
  let fixture: ComponentFixture<BookPostSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPostSmallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPostSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
