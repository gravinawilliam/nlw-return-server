import { HttpStatusCodeUtil } from '@shared/utils/http-status-code.util';

import { CustomError } from './custom.error';

type ParametersDTO = {
  error?: Error;
};

export class ServerError extends CustomError {
  constructor(parameters: ParametersDTO) {
    super({
      message: 'Server failed. Try again soon',
      name: 'ServerError',
      stack: parameters.error?.stack,
      statusCode: HttpStatusCodeUtil.INTERNAL_SERVER_ERROR
    });
  }
}
