import { TestBed } from '@angular/core/testing';

import { RotatecaptchaService } from './rotatecaptcha.service';

describe('RotatecaptchaService', () => {
  let service: RotatecaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotatecaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
