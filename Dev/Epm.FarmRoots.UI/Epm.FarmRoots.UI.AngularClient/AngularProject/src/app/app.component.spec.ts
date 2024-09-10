import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

// Mock components
@Component({ selector: 'app-header', template: '' })
class HeaderStubComponent { }

@Component({ selector: 'app-side-bar', template: '' })
class SidebarStubComponent { }

@Component({ selector: 'app-footer', template: '' })
class FooterStubComponent { }

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        SidebarStubComponent,
        FooterStubComponent
      ],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should include an app-header component', () => {
    const header = fixture.debugElement.nativeElement.querySelector('app-header');
    expect(header).not.toBeNull();
  });

  it('should include an app-side-bar component', () => {
    const sidebar = fixture.debugElement.nativeElement.querySelector('app-side-bar');
    expect(sidebar).not.toBeNull();
  });

  it('should include a main content area with a router-outlet', () => {
    const mainContent = fixture.debugElement.nativeElement.querySelector('.main-content');
    const routerOutlet = fixture.debugElement.nativeElement.querySelector('router-outlet');
    expect(mainContent).not.toBeNull();
    expect(routerOutlet).not.toBeNull();
  });

  it('should include an app-footer component', () => {
    const footer = fixture.debugElement.nativeElement.querySelector('app-footer');
    expect(footer).not.toBeNull();
  });
});
