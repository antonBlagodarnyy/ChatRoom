import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsErrorComponent } from './wsError.component';

describe('WsErrorComponent', () => {
  let component: WsErrorComponent;
  let fixture: ComponentFixture<WsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WsErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
