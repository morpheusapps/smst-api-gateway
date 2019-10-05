import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalErrorHandler {
  public handle = (): /*keysToFieldsMap: { [key: string]: string },
  error: Error & { detail: string }*/
  void => {};
}
