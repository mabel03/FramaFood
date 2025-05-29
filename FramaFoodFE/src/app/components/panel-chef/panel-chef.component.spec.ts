import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelChefComponent } from './panel-chef.component';

describe('PanelChefComponent', () => {
  let component: PanelChefComponent;
  let fixture: ComponentFixture<PanelChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
