import { ICreateFeedbacksRepository } from '@domain/repositories/feedbacks/create.feedbacks-repository';
import { FeedbacksPrismaRepository } from '@infra/database/prisma/repositories/feedbacks.prisma-repository';

import { makeUuidProvider } from '../providers/cryptography/uuid-provider.factory';
import { makeLoggerProvider } from '../providers/logger/logger-provider.factory';

export const makeFeedbacksRepositoryProvider = (): ICreateFeedbacksRepository => {
  return new FeedbacksPrismaRepository(makeLoggerProvider(), makeUuidProvider());
};
