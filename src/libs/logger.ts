import winston from 'winston';

const myFormat = winston.format.printf(
  ({ level, message, service, timestamp }) => {
    return `${timestamp} ${level} (${(
      service as string
    ).toUpperCase()}): ${message}`;
  }
);

const loggerService = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'system' },
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      dirname: 'logs',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'info.log',
      dirname: 'logs',
      level: 'info',
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.label(),
        myFormat
      ),
    }),
  ],
});

export type LoggerServices =
  | 'SYSTEM'
  | 'AUTH'
  | 'HEALTH'
  | 'HTTP'
  | 'USER'
  | 'ONBOARD'
  | 'ORGANIZATION'
  | 'INVOICE';

namespace logger {
  export function info(
    message: string,
    service: LoggerServices,
    meta?: Record<string, unknown>
  ) {
    loggerService.info(message, { service, ...meta });
  }

  export function error(
    message: string,
    service: LoggerServices,
    meta?: Record<string, unknown>
  ) {
    loggerService.error(message, { service, ...meta });
  }
}

export default logger;
