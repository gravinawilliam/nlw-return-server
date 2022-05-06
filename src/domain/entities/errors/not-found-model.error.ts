import { HttpStatusCodeUtil } from '@shared/utils/http-status-code.util';

import { CustomError } from './custom.error';

type ParametersDTO = {
  model: string;
};

export class NotFoundModelError extends CustomError {
  constructor({ model }: ParametersDTO) {
    super({
      message: `Not found model ${model}`,
      name: 'NotFoundModelError',
      statusCode: HttpStatusCodeUtil.NOT_FOUND
    });
  }
}
