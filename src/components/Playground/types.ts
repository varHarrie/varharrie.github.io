export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'fatal';

export type LogRecord = {
  level: LogLevel;
  message: string[];
  extras?: unknown;
};
