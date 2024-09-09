import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageUploadService } from './image-upload.service';

describe('ImageUploadService', () => {
  let service: ImageUploadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageUploadService]
    });

    service = TestBed.inject(ImageUploadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload images and return response', () => {
    const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('images', mockFile);

    service.uploadImages([mockFile]).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://localhost:7189/api/Images/upload');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true }); // Mock the API response
  });

  it('should return error if upload fails', () => {
    const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('images', mockFile);

    service.uploadImages([mockFile]).subscribe(
      () => fail('Expected error, but got success response'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('https://localhost:7189/api/Images/upload');
    req.flush('Upload failed', { status: 500, statusText: 'Server Error' });
  });
});
