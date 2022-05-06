import { ServerError } from '@domain/entities/errors/server.error';
import { IGenerateUuidProvider } from '@domain/providers/cryptography/uuid/generate-uuid.provider';
import { ILoggerErrorProvider } from '@domain/providers/logger/logger-error-provider.interface';
import {
  CreateFeedbacksRepositoryDTO,
  ICreateFeedbacksRepository
} from '@domain/repositories/feedbacks/create.feedbacks-repository';
import { failure, success } from '@shared/utils/either.util';

import { prisma } from '../prisma';

export class FeedbacksPrismaRepository implements ICreateFeedbacksRepository {
  constructor(
    private readonly loggerProvider: ILoggerErrorProvider,
    private readonly cryptographyUuidProvider: IGenerateUuidProvider
  ) {}

  public async create(
    parameters: CreateFeedbacksRepositoryDTO.Parameters
  ): CreateFeedbacksRepositoryDTO.Result {
    try {
      const idGenerated = this.cryptographyUuidProvider.generateUuid();
      if (idGenerated.isFailure()) return failure(idGenerated.value);
      const { generatedUuid } = idGenerated.value;

      console.log({
        parameters
      });

      const created = await prisma.feedback.create({
        data: {
          comment: parameters.comment,
          type: parameters.type,
          screenshot: parameters.screenshot,
          id: generatedUuid
        }
      });

      return success({
        feedback: {
          id: created.id
        }
      });
    } catch (error: any) {
      this.loggerProvider.error({
        message: 'Error creating feedback',
        value: error
      });

      return failure(new ServerError(error));
    }
  }
}
