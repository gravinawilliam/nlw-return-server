import { IGenerateUuidProvider } from '@domain/providers/cryptography/uuid/generate-uuid.provider';
import { UuidProvider } from '@infra/providers/cryptography/uuid/uuid.provider';

import { makeLoggerProvider } from '../logger/logger-provider.factory';

export const makeUuidProvider = (): IGenerateUuidProvider => {
  return new UuidProvider(makeLoggerProvider());
};
