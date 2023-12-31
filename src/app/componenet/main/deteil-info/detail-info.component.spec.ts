import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoComponent } from './detail-info.component';

describe('DeteilInfoComponent', () => {
  let component: DetailInfoComponent;
  let fixture: ComponentFixture<DetailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
