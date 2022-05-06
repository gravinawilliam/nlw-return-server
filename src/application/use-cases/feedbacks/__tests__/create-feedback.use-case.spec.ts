import { mock, MockProxy } from 'jest-mock-extended';

import { InvalidContentParameterError } from '@domain/entities/errors/invalid-content-parameter.error';
import { ServerError } from '@domain/entities/errors/server.error';
import { ISendEmailProvider, SendEmailProviderDTO } from '@domain/providers/emails/send-email.provider';
import {
  CreateFeedbacksRepositoryDTO,
  ICreateFeedbacksRepository
} from '@domain/repositories/feedbacks/create.feedbacks-repository';
import {
  CreateFeedbackUseCaseDTO,
  ICreateFeedbackUseCase
} from '@domain/use-cases/feedbacks/create-feedback.use-case';
import { failure, success } from '@shared/utils/either.util';

import { CreateFeedbackUseCase } from '../create-feedback.use-case';

describe('Create Feedback Use Case', () => {
  let sut: ICreateFeedbackUseCase;
  let feedbacksRepository: MockProxy<ICreateFeedbacksRepository>;
  let emailProvider: MockProxy<ISendEmailProvider>;

  beforeAll(() => {
    feedbacksRepository = mock();
    feedbacksRepository.create.mockResolvedValue(
      success({
        feedback: {
          id: 'any_id'
        }
      })
    );

    emailProvider = mock();
    emailProvider.sendEmail.mockResolvedValue(
      success({
        isSuccess: true
      })
    );
  });

  beforeEach(() => {
    sut = new CreateFeedbackUseCase(feedbacksRepository, emailProvider);
  });

  it('should be able to create a feedback', async () => {
    const correctParametersSut: CreateFeedbackUseCaseDTO.Parameters = {
      comment: 'any_comment',
      type: 'BUG',
      screenshot: 'data:image/png;base64,any_screenshot_1'
    };

    const result = await sut.execute(correctParametersSut);

    expect(result.value).toEqual({
      feedback: {
        id: 'any_id'
      }
    } as CreateFeedbackUseCaseDTO.ResultSuccess);
  });

  it('should call feedbacksRepository.create with correct params', async () => {
    const correctParametersSut: CreateFeedbackUseCaseDTO.Parameters = {
      comment: 'any_comment',
      type: 'BUG',
      screenshot: 'data:image/png;base64,any_screenshot_2'
    };

    await sut.execute(correctParametersSut);

    expect(feedbacksRepository.create).toHaveBeenCalledWith({
      comment: correctParametersSut.comment,
      type: correctParametersSut.type,
      screenshot: correctParametersSut.screenshot
    } as CreateFeedbacksRepositoryDTO.Parameters);
    expect(feedbacksRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should call emailProvider.sendEmail with correct params', async () => {
    const correctParametersSut: CreateFeedbackUseCaseDTO.Parameters = {
      comment: 'any_comment',
      type: 'BUG',
      screenshot: 'data:image/png;base64,any_screenshot_3'
    };

    await sut.execute(correctParametersSut);

    expect(emailProvider.sendEmail).toHaveBeenCalledWith({
      body: [
        `<div style="font-family= sans-serif; font-size: 16px; color: #21203f">`,
        `<p>Tipo do feedback: ${correctParametersSut.type}</p>`,
        `<p>Comentário: ${correctParametersSut.comment}</p>`,
        `</div>`
      ].join('\n'),
      subject: 'Novo feedback'
    } as SendEmailProviderDTO.Parameters);
    expect(emailProvider.sendEmail).toHaveBeenCalledTimes(1);
  });

  it('should not be able to create a feedback without type', async () => {
    const correctParametersSut: CreateFeedbackUseCaseDTO.Parameters = {
      comment: 'any_comment',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      type: '',
      screenshot: 'data:image/png;base64,any_screenshot'
    };

    const result = await sut.execute(correctParametersSut);

    expect(result.value).toEqual(
      new InvalidContentParameterError({
        messageDefault: {
          parameter: 'type',
          content: correctParametersSut.type
        }
      })
    );
  });

  it('should not be able to create a feedback without comment', async () => {
    const correctParametersSut: CreateFeedbackUseCaseDTO.Parameters = {
      comment: '',
      type: 'BUG',
      screenshot: 'data:image/png;base64,any_screenshot'
    };

    const result = await sut.execute(correctParametersSut);

    expect(result.value).toEqual(
      new InvalidContentParameterError({
        messageDefault: {
          parameter: 'comment',
          content: correctParametersSut.comment
        }
      })
    );
  });

  it('should not be able to create a feedback with an invalid screenshot', async () => {
    const correctParametersSut: CreateFeedbackUseCaseDTO.Parameters = {
      comment: 'any_comment',
      type: 'BUG',
      screenshot: 'invalid_screenshot'
    };

    const result = await sut.execute(correctParametersSut);

    expect(result.value).toEqual(
      new InvalidContentParameterError({
        messageDefault: {
          parameter: 'screenshot',
          content: correctParametersSut.screenshot
        }
      })
    );
  });

  it('should not be able to create a feedback when return error in create feedback repository', async () => {
    feedbacksRepository.create.mockResolvedValue(failure(new ServerError({})));

    const correctParametersSut: CreateFeedbackUseCaseDTO.Parameters = {
      comment: 'any_comment',
      type: 'BUG',
      screenshot: 'data:image/png;base64,any_screenshot_4'
    };

    const result = await sut.execute(correctParametersSut);

    expect(result.value).toEqual(new ServerError({}));
  });
});
