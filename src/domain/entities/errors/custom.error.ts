import { HttpStatusCodeUtil } from '@shared/utils/http-status-code.util';

type ParametersConstructorDTO = {
  message: string;
  statusCode?: number;
  name?: string;
  stack?: string;
};

export class CustomError {
  name: string;

  message: string;

  stack?: string;

  statusCode: number;

  constructor({ message, statusCode, name, stack }: ParametersConstructorDTO) {
    this.message = message;
    this.statusCode = statusCode ?? HttpStatusCodeUtil.BAD_REQUEST;
    this.name = name ?? 'CustomError';
    this.stack = stack ?? '';
  }
}
