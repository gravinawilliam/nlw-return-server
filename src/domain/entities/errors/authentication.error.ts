import { HttpStatusCodeUtil } from '@shared/utils/http-status-code.util';

import { Email } from '../entities/email.model';
import { CustomError } from './custom.error';

type ParametersDTO = {
  email: Email;
  password: string;
};

export class AuthenticationError extends CustomError {
  constructor({ email, password }: ParametersDTO) {
    super({
      message: `Authentication failed with credentials ${email.value} and ${password}.`,
      statusCode: HttpStatusCodeUtil.UNAUTHORIZED,
      name: 'AuthenticationError'
    });
  }
}
