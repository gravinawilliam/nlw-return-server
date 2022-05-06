import {
  CreateFeedbackControllerDTO,
  ICreateFeedbackController
} from '@domain/controllers/feedbacks/create-feedback.controller';
import { ICreateFeedbackUseCase } from '@domain/use-cases/feedbacks/create-feedback.use-case';
import { created } from '@shared/utils/http-response.util';

export class CreateFeedbackController implements ICreateFeedbackController {
  constructor(private readonly createFeedbackUseCase: ICreateFeedbackUseCase) {}

  public async handle({ body }: CreateFeedbackControllerDTO.Parameters): CreateFeedbackControllerDTO.Result {
    const resultCreateUser = await this.createFeedbackUseCase.execute({
      comment: body.comment,
      type: body.type,
      screenshot: body.screenshot
    });
    if (resultCreateUser.isFailure()) {
      return {
        data: resultCreateUser.value,
        statusCode: resultCreateUser.value.statusCode
      };
    }

    return created({
      feedback: { id: resultCreateUser.value.feedback.id }
    } as CreateFeedbackControllerDTO.ResultSuccess);
  }
}
