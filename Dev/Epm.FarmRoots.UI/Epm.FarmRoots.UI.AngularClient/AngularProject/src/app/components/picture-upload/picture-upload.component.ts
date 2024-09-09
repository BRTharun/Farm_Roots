import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from '../../services/image-upload.service';
import { ToastrService } from 'ngx-toastr';

interface CustomFile extends File {
  preview?: string;
}

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.css']
})
export class PictureUploadComponent implements OnInit {
  selectedFiles: CustomFile[] = [];
  maxFileSize: number = 5 * 1024 * 1024; // 5MB
  allowedFileTypes: string[] = ['image/jpeg', 'image/png']; // Allowed file types

  constructor(
    private imageUploadService: ImageUploadService,
    private toastr: ToastrService
  ) { }

  ngOnInit() { }

  onFilesChange(event: any) {
    const files = Array.from(event.target.files) as CustomFile[];
    files.forEach(file => {
      if (!this.isFileTypeValid(file)) {
        this.toastr.error('Invalid file type. Please upload JPG or PNG images only.', 'Error');
        return;
      }
      if (this.isFileSizeValid(file)) {
        this.isImageResolutionValid(file).then(isValid => {
          if (isValid) {
            file.preview = URL.createObjectURL(file); // Create preview URL
            this.selectedFiles.push(file);
          } else {
            this.toastr.error('Image resolution is too low. Please upload an image with at least 500x500 pixels.', 'Error');
          }
        });
      } else {
        this.toastr.error('File size exceeds 5MB. Please upload a smaller file.', 'Error');
      }
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []) as CustomFile[];
    files.forEach(file => {
      if (!this.isFileTypeValid(file)) {
        this.toastr.error('Invalid file type. Please upload JPG or PNG images only.', 'Error');
        return;
      }
      if (this.isFileSizeValid(file)) {
        this.isImageResolutionValid(file).then(isValid => {
          if (isValid) {
            file.preview = URL.createObjectURL(file); // Create preview URL
            this.selectedFiles.push(file);
          } else {
            this.toastr.error('Image resolution is too low. Please upload an image with at least 500x500 pixels.', 'Error');
          }
        });
      } else {
        this.toastr.error('File size exceeds 5MB. Please upload a smaller file.', 'Error');
      }
    });
  }

  removeFile(file: CustomFile) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  uploadPictures() {
    if (this.selectedFiles.length > 0) {
      this.imageUploadService.uploadImages(this.selectedFiles).subscribe(
        response => {
          this.toastr.success('Image successfully uploaded', 'Success');
          this.selectedFiles = [];
        },
        error => {
          this.toastr.error('Upload failed. Please try again.', 'Error');
        }
      );
    }
  }

  isFileSizeValid(file: CustomFile): boolean {
    return file.size <= this.maxFileSize;
  }

  isFileTypeValid(file: CustomFile): boolean {
    return this.allowedFileTypes.includes(file.type);
  }

  isImageResolutionValid(file: CustomFile): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width >= 500 && img.height >= 500);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  }
}
