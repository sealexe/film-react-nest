import { LoggerService } from '@nestjs/common';
import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

const loggerTypes = ['dev', 'json', 'tskv'] as const;

type TLoggerType = (typeof loggerTypes)[number];

export const loggerFactory = (format: string | undefined): LoggerService => {
  const resolvedFormat = format || 'dev';

  const isFormat = (loggerTypes as readonly string[]).includes(resolvedFormat);

  if (!isFormat) {
    throw new Error('Задайте правильный формат логгера');
  }

  switch (resolvedFormat as TLoggerType) {
    case 'dev':
      return new DevLogger();
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    default:
      throw new Error(`Необработанный формат логгера: ${resolvedFormat}`);
  }
};
