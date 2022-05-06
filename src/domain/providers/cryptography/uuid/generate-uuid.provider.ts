import { ServerError } from '@domain/entities/errors/server.error';
import { Either } from '@shared/utils/either.util';

export namespace GenerateUuidProviderDTO {
  type ResultSuccess = { generatedUuid: string };
  type ResultErrors = ServerError;

  export type Result = Either<ResultErrors, ResultSuccess>;
}

export interface IGenerateUuidProvider {
  generateUuid(): GenerateUuidProviderDTO.Result;
}
