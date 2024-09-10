import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component'; // Import SidebarComponent

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent,
        SidenavComponent // Declare SidebarComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //it(`should have as title 'AngularProject'`, () => {
  //  const fixture = TestBed.createComponent(AppComponent);
  //  const app = fixture.componentInstance;
  //  expect(app.title).toEqual('AngularProject');
  //});

  //it('should render title', () => {
  //  const fixture = TestBed.createComponent(AppComponent);
  //  fixture.detectChanges();
  //  const compiled = fixture.nativeElement as HTMLElement;
  //  expect(compiled.querySelector('h1')?.textContent).toContain('Hello, AngularProject');
  //});
});
