import { HttpStatusCodeUtil } from '@shared/utils/http-status-code.util';

import { CustomError } from './custom.error';

type ParametersDTO = {
  model: string;
  parameter: string;
};

export class NotFoundModelByParameterError extends CustomError {
  constructor({ model, parameter }: ParametersDTO) {
    super({
      message: `Not found model ${model} by param ${parameter}.`,
      name: 'NotFoundModelByParameterError',
      statusCode: HttpStatusCodeUtil.NOT_FOUND
    });
  }
}
