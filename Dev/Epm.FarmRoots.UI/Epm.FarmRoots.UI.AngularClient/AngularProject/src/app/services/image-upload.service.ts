import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private apiUrl = 'https://localhost:7189/api/Images/upload';

  constructor(private http: HttpClient) { }

  uploadImages(files: File[], productId: number): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file, file.name)); // Include filenames
    formData.append('productId', productId.toString());

    return this.http.post(this.apiUrl, formData);
  }

}
