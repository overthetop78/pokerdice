import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPasswordComponent } from './lobby-password.component';

describe('LobbyPasswordComponent', () => {
  let component: LobbyPasswordComponent;
  let fixture: ComponentFixture<LobbyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
