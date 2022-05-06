import { CreateFeedbackController } from '@application/controllers/feedbacks/create-feedback.controller';
import { CreateFeedbackUseCase } from '@application/use-cases/feedbacks/create-feedback.use-case';
import { ICreateFeedbackController } from '@domain/controllers/feedbacks/create-feedback.controller';
import { ICreateFeedbackUseCase } from '@domain/use-cases/feedbacks/create-feedback.use-case';
import { MailtrapEmailProvider } from '@infra/providers/emails/mailtrap-emails.provider';
import { makeFeedbacksRepositoryProvider } from '@main/factories/repositories/feedbacks-repository.factory';

export const makeCreateFeedbacksController = (): ICreateFeedbackController => {
  const feedbacksRepository = makeFeedbacksRepositoryProvider();

  const emailProvider = new MailtrapEmailProvider();

  const createFeedbackUseCase: ICreateFeedbackUseCase = new CreateFeedbackUseCase(
    feedbacksRepository,
    emailProvider
  );

  return new CreateFeedbackController(createFeedbackUseCase);
};
