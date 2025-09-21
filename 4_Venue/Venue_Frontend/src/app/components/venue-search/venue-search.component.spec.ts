import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueSearchComponent } from './venue-search.component';

describe('VenueSearchComponent', () => {
  let component: VenueSearchComponent;
  let fixture: ComponentFixture<VenueSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
