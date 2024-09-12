import { Injectable } from '@angular/core';
import { RotateTask } from '../models/rotate-task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RotatecaptchaService {
  private apiKey = 'YOUR_API_KEY';
  private createTaskUrl = 'https://api.2captcha.com/createTask';
  private getTaskResultUrl = 'https://api.2captcha.com/getTaskResult';

  constructor(private http: HttpClient) { }

  createTask(task: RotateTask): Observable<any> {
    const body = {
      clientKey: this.apiKey,
      task,
      languagePool: 'en'
    };
    return this.http.post(this.createTaskUrl, body);
  }

  getTaskResult(taskId: number): Observable<any> {
    const params = {
      clientKey: this.apiKey,
      taskId: taskId
    };
    return this.http.get(this.getTaskResultUrl, { params });
  }
}
