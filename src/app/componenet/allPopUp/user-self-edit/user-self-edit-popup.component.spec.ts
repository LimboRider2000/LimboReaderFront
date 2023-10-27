import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelfEditPopupComponent } from './user-self-edit-popup.component';

describe('UserSelfEditComponent', () => {
  let component: UserSelfEditPopupComponent;
  let fixture: ComponentFixture<UserSelfEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelfEditPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSelfEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
