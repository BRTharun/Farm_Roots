import { Component } from '@angular/core';
import { RotatecaptchaService } from '../../services/rotatecaptcha.service';
import { RotateTask } from '../../models/rotate-task';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrl: './captcha.component.css'
})
export class CaptchaComponent {
  solution: string | null = null;
  constructor(private captchaService: RotatecaptchaService) { }

  /* solveCaptcha() {
     const imageData = 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='; // Example image data
     const angle = 60;
 
     this.captchaService.createTask(imageData, angle).subscribe({
       next: (response) => {
         const taskId = response.data.taskId;
         this.checkCaptchaSolution(taskId);
       },
       error: (error) => console.error('Error creating task:', error)
     });
   }
 
   checkCaptchaSolution(taskId: number) {
     this.captchaService.getTaskResult(taskId).subscribe({
       next: (response) => {
         if (response.status === 'ready') {
           console.log('CAPTCHA solution:', response.solution.rotate);
         } else {
           console.log('CAPTCHA not ready yet');
         }
       },
       error: (error) => console.error('Error getting task result:', error)
     });
   }  */

  solveCaptcha() {
    const imageData: string = 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    const task: RotateTask = {
      type: 'RotateTask',
      body: imageData,
      angle: 90,
      comment: 'Please reposition the image to its upright position',
      imgInstructions: 'data:image/png;base64,...'
    };

    this.captchaService.createTask(task).subscribe({
      next: (response) => {
        const taskId = response.data.taskId;
        this.checkCaptchaSolution(taskId);
      },
      error: (error) => console.error('Error creating task:', error)
    });
  }

  checkCaptchaSolution(taskId: number) {
    this.captchaService.getTaskResult(taskId).subscribe({
      next: (response) => {
        if (response.status === 'ready') {
          console.log('CAPTCHA solution:', response.solution.rotate);
        } else {
          console.log('CAPTCHA not ready yet');
        }
      },
      error: (error) => console.error('Error getting task result:', error)
    });
  }


}
