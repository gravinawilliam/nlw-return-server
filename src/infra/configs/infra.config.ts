import { getEnvironmentNumber, getEnvironmentString } from '@infra/utils/environment';

const GlobalConfig = {
  ENVIRONMENT: getEnvironmentString('NODE_ENV', 'DEVELOPMENT'),
  IS_DEVELOPMENT: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'DEVELOPMENT',
  IS_PRODUCTION: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'PRODUCTION',
  IS_QA: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'QA',
  IS_HOMOLOGATION: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'HOMOLOGATION',
  IS_LOCAL: getEnvironmentString('NODE_ENV', 'DEVELOPMENT') === 'LOCAL',
  LOGS_FOLDER: getEnvironmentString('LOGS_FOLDER', 'logs')
};

const DatabaseConfig = {
  TYPE: getEnvironmentString('DATABASE_TYPE', 'postgres'),
  HOST: getEnvironmentString('DATABASE_HOST', 'localhost'),
  PORT: getEnvironmentNumber('DATABASE_PORT', 5432),
  USERNAME: getEnvironmentString('DATABASE_USERNAME', 'docker'),
  PASSWORD: getEnvironmentString('DATABASE_PASSWORD', 'docker'),
  DATABASE: getEnvironmentString('DATABASE_DATABASE', 'pomofi')
};

export { DatabaseConfig, GlobalConfig };
