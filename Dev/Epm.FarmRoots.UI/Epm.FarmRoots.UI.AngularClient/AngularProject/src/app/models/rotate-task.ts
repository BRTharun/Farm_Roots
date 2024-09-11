export interface RotateTask {
  type: 'RotateTask';
  body: string;  // Base64 encoded image
  angle?: number;
  comment?: string;
  imgInstructions?: string;  // Base
}
