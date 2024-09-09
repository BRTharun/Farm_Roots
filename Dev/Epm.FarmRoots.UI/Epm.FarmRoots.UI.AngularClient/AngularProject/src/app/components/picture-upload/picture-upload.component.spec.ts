import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PictureUploadComponent } from './picture-upload.component';
import { ImageUploadService } from '../../services/image-upload.service';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ImageUploadService, useValue: spyImageUpload },
        { provide: ToastrService, useValue: spyToastr }
      ]
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

  //it('should call onFilesChange and add files to selectedFiles', () => {
  //  const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
  //  const event = { target: { files: [mockFile] } };

  //  spyOn(component, 'isImageResolutionValid').and.returnValue(Promise.resolve(true));
  //  component.onFilesChange(event as any);

  //  fixture.detectChanges();

  //  expect(component.selectedFiles.length).toBe(1);
  //  expect(component.selectedFiles[0].name).toBe('sample.png');
  //});

  it('should remove a file from selectedFiles', () => {
    const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
    component.selectedFiles = [mockFile];

    component.removeFile(mockFile);

    expect(component.selectedFiles.length).toBe(0);
  });

  it('should call uploadImages and show success toastr on successful upload', () => {
    const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
    component.selectedFiles = [mockFile];

    mockImageUploadService.uploadImages.and.returnValue(of({}));
    component.uploadPictures();

    expect(mockImageUploadService.uploadImages).toHaveBeenCalled();
    expect(mockToastr.success).toHaveBeenCalledWith('Image successfully uploaded', 'Success');
  });

  it('should show error toastr on file size exceeding 5MB', () => {
    const largeFile = new File([''.padEnd(6 * 1024 * 1024, 'x')], 'large.png', { type: 'image/png' });
    const event = { target: { files: [largeFile] } };

    component.onFilesChange(event as any);

    expect(mockToastr.error).toHaveBeenCalledWith('File size exceeds 5MB. Please upload a smaller file.', 'Error');
  });

  it('should show error toastr on upload failure', () => {
    const mockFile = new File(['sample'], 'sample.png', { type: 'image/png' });
    component.selectedFiles = [mockFile];

    mockImageUploadService.uploadImages.and.returnValue(throwError({ error: 'Upload failed' }));
    component.uploadPictures();

    expect(mockToastr.error).toHaveBeenCalledWith('Upload failed. Please try again.', 'Error');
  });
});
