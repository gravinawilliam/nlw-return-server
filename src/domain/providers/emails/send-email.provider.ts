import { ServerError } from '@domain/entities/errors/server.error';
import { Either } from '@shared/utils/either.util';

export namespace SendEmailProviderDTO {
  export type Parameters = {
    body: string;
    subject: string;
  };

  type ResultSuccess = {
    isSuccess: true;
  };
  type ResultErrors = ServerError;

  export type Result = Promise<Either<ResultErrors, ResultSuccess>>;
}

export interface ISendEmailProvider {
  sendEmail(parameters: SendEmailProviderDTO.Parameters): SendEmailProviderDTO.Result;
}
