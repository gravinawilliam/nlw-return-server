import { InvalidContentParameterError } from '@domain/entities/errors/invalid-content-parameter.error';
import { ISendEmailProvider } from '@domain/providers/emails/send-email.provider';
import { ICreateFeedbacksRepository } from '@domain/repositories/feedbacks/create.feedbacks-repository';
import {
  CreateFeedbackUseCaseDTO,
  ICreateFeedbackUseCase
} from '@domain/use-cases/feedbacks/create-feedback.use-case';
import { Either, failure, success } from '@shared/utils/either.util';

export class CreateFeedbackUseCase implements ICreateFeedbackUseCase {
  constructor(
    private readonly feedbacksRepository: ICreateFeedbacksRepository,
    private readonly emailProvider: ISendEmailProvider
  ) {}

  public async execute(parameters: CreateFeedbackUseCaseDTO.Parameters): CreateFeedbackUseCaseDTO.Result {
    const resultValidateParameters = this.validateParameters(parameters);
    if (resultValidateParameters.isFailure()) return failure(resultValidateParameters.value);

    const createdFeedback = await this.feedbacksRepository.create({
      comment: parameters.comment,
      type: parameters.type,
      screenshot: parameters.screenshot
    });
    if (createdFeedback.isFailure()) return failure(createdFeedback.value);
    const { feedback } = createdFeedback.value;

    await this.emailProvider.sendEmail({
      body: [
        `<div style="font-family= sans-serif; font-size: 16px; color: #21203f">`,
        `<p>Tipo do feedback: ${parameters.type}</p>`,
        `<p>Comentário: ${parameters.comment}</p>`,
        `</div>`
      ].join('\n'),
      subject: 'Novo feedback'
    });

    return success({ feedback } as CreateFeedbackUseCaseDTO.ResultSuccess);
  }

  private validateParameters(
    parameters: CreateFeedbackUseCaseDTO.Parameters
  ): Either<InvalidContentParameterError, { isSuccess: true }> {
    if (!parameters.type) {
      return failure(
        new InvalidContentParameterError({
          messageDefault: {
            parameter: 'type',
            content: parameters.type
          }
        })
      );
    }

    if (!parameters.comment) {
      return failure(
        new InvalidContentParameterError({
          messageDefault: {
            parameter: 'comment',
            content: parameters.comment
          }
        })
      );
    }

    if (parameters.screenshot && !parameters.screenshot.startsWith('data:image/png;base64,')) {
      return failure(
        new InvalidContentParameterError({
          messageDefault: {
            parameter: 'screenshot',
            content: parameters.screenshot
          }
        })
      );
    }

    return success({ isSuccess: true });
  }
}
