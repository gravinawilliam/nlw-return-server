import { HttpResponse } from 'src/shared/interfaces/http-response.interface';

import { TypeFeedback } from '@domain/entities/entities/feedback.model';

export namespace CreateFeedbackControllerDTO {
  export type Parameters = {
    body: {
      type: TypeFeedback;
      comment: string;
      screenshot?: string;
    };
  };

  export type ResultSuccess = {
    feedback: {
      id: string;
    };
  };

  export type Result = Promise<HttpResponse<Error | ResultSuccess>>;
}

export interface ICreateFeedbackController {
  handle(parameters: CreateFeedbackControllerDTO.Parameters): CreateFeedbackControllerDTO.Result;
}
