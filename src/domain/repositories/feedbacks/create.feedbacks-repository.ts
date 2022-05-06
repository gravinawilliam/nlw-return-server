import { Either } from 'src/shared/utils/either.util';

import { TypeFeedback } from '@domain/entities/entities/feedback.model';
import { ServerError } from '@domain/entities/errors/server.error';

export namespace CreateFeedbacksRepositoryDTO {
  export type Parameters = {
    type: TypeFeedback;
    comment: string;
    screenshot?: string;
  };

  type ResultSuccess = { feedback: { id: string } };
  type ResultErrors = ServerError;

  export type Result = Promise<Either<ResultErrors, ResultSuccess>>;
}

export interface ICreateFeedbacksRepository {
  create(parameters: CreateFeedbacksRepositoryDTO.Parameters): CreateFeedbacksRepositoryDTO.Result;
}
