import * as uuid from 'uuid';

import { ServerError } from '@domain/entities/errors/server.error';
import {
  GenerateUuidProviderDTO,
  IGenerateUuidProvider
} from '@domain/providers/cryptography/uuid/generate-uuid.provider';
import { ILoggerErrorProvider } from '@domain/providers/logger/logger-error-provider.interface';
import { failure, success } from '@shared/utils/either.util';

export class UuidProvider implements IGenerateUuidProvider {
  constructor(private readonly loggerProvider: ILoggerErrorProvider) {}

  public generateUuid(): GenerateUuidProviderDTO.Result {
    try {
      const generatedUuid = uuid.v4();

      return success({
        generatedUuid
      });
    } catch (error: any) {
      this.loggerProvider.error({
        message: 'Error generating uuid',
        value: error
      });
      return failure(new ServerError(error));
    }
  }
}
