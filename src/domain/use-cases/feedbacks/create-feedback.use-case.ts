import { Either } from 'src/shared/utils/either.util';

import { TypeFeedback } from '@domain/entities/entities/feedback.model';
import { InvalidContentParameterError } from '@domain/entities/errors/invalid-content-parameter.error';

export namespace CreateFeedbackUseCaseDTO {
  export type Parameters = {
    type: TypeFeedback;
    comment: string;
    screenshot?: string;
  };

  export type ResultSuccess = { feedback: { id: string } };
  export type ResultErrors = InvalidContentParameterError;

  export type Result = Promise<Either<ResultErrors, ResultSuccess>>;
}

export interface ICreateFeedbackUseCase {
  execute(parameters: CreateFeedbackUseCaseDTO.Parameters): CreateFeedbackUseCaseDTO.Result;
}
