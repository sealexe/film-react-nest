import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const optional = optionalParams.length
      ? `optional=${JSON.stringify(optionalParams)}`
      : '';
    return [
      `level=${level}`,
      `message=${String(message).replace(/\t/g, '')}`,
      optional,
    ]
      .filter((data) => data)
      .join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('warn', message, ...optionalParams));
  }
}
