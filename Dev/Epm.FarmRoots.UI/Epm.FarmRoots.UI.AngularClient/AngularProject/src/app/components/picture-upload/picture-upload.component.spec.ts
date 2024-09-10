import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureUploadComponent } from './picture-upload.component';
import { ImageUploadService } from '../../services/image-upload.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PictureUploadComponent', () => {
  let component: PictureUploadComponent;
  let fixture: ComponentFixture<PictureUploadComponent>;
  let mockImageUploadService: jasmine.SpyObj<ImageUploadService>;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const spyImageUpload = jasmine.createSpyObj('ImageUploadService', ['uploadImages']);
    const spyToastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [PictureUploadComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ImageUploadService, useValue: spyImageUpload },
        { provide: ToastrService, useValue: spyToastr }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PictureUploadComponent);
    component = fixture.componentInstance;
    mockImageUploadService = TestBed.inject(ImageUploadService) as jasmine.SpyObj<ImageUploadService>;
    mockToastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should call uploadImages and show success toastr on successful upload', () => {
    const mockFile = new File(['sample content'], 'sample.png', { type: 'image/png' });
    component.selectedFiles = [mockFile];
    component.productId = 1;

    mockImageUploadService.uploadImages.and.returnValue(of({}));
    component.uploadPictures();

    expect(mockImageUploadService.uploadImages).toHaveBeenCalledWith([mockFile], 1);
    expect(mockToastr.success).toHaveBeenCalledWith('Images successfully uploaded', 'Success');
  });

  it('should show error toastr on file size exceeding 5MB', () => {
    const largeFile = new File([''.padEnd(6 * 1024 * 1024, 'x')], 'large.png', { type: 'image/png' });
    const event = { target: { files: [largeFile] } };

    component.onFilesChange(event as any);

    expect(mockToastr.error).toHaveBeenCalledWith('File size exceeds 5MB. Please upload a smaller file.', 'Error');
  });

  it('should show error toastr on upload failure', () => {
    const mockFile = new File(['sample content'], 'sample.png', { type: 'image/png' });
    component.selectedFiles = [mockFile];
    component.productId = 1;

    mockImageUploadService.uploadImages.and.returnValue(throwError({ error: 'Upload failed' }));
    component.uploadPictures();

    expect(mockToastr.error).toHaveBeenCalledWith('Upload failed. Please try again.', 'Error');
  });

  it('should show error toastr if no files or productId is invalid', () => {
    component.selectedFiles = [];
    component.productId = 0;

    component.uploadPictures();

    expect(mockToastr.error).toHaveBeenCalledWith('Please select a valid product and images to upload.', 'Error');
  });
});
