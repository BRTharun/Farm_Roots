export interface ResponseDto<T> {
  isSuccess: boolean;
  result: T;
  message?: string;
}
