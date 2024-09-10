import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideBarComponent],
      imports: [RouterTestingModule] 
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to the price section', () => {
    const compiled = fixture.debugElement.nativeElement;
    const link = compiled.querySelector('.nav li a');
    expect(link.textContent).toContain('Price Section');
    expect(link.getAttribute('href')).toContain('/price');
  });
});
