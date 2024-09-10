import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have four navigation links', () => {
    const footerElement = fixture.debugElement.nativeElement;
    const links = footerElement.querySelectorAll('.footer-link');
    expect(links.length).toEqual(4);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('About Us');
    expect(links[2].textContent).toContain('Privacy Policy');
    expect(links[3].textContent).toContain('Contact');
  });

  it('should have social media icons', () => {
    const footerElement = fixture.debugElement.nativeElement;
    const icons = footerElement.querySelectorAll('.social-icon img');
    expect(icons.length).toEqual(3);
    expect(icons[0].src).toContain('facebook.png');
    expect(icons[1].src).toContain('twitter.png');
    expect(icons[2].src).toContain('instagram.png');
  });

  it('should display copyright text', () => {
    const footerElement = fixture.debugElement.nativeElement;
    const copyright = footerElement.querySelector('.copyright');
    expect(copyright.textContent).toContain('2024 Local Goods. All rights reserved.');
  });
});
