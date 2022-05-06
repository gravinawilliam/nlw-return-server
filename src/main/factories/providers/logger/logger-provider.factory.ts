import { ILoggerErrorProvider } from '@domain/providers/logger/logger-error-provider.interface';
import { WinstonLoggerProvider } from '@infra/providers/logger/winston-logger.provider';

export const makeLoggerProvider = (): ILoggerErrorProvider => {
  return new WinstonLoggerProvider();
};
