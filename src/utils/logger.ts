
import winston, {format} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export type LogMessage = string;

export type LogContext = object;

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export class Logging {
  private _logger: winston.Logger;
  private static _appName = 'PMCS';
  private static _instance: Logging

  private constructor() {
    this._logger = this._initializeWinston();
  }

  public static getInstance(){
    if (this._instance){
        return this._instance
    } else {
        this._instance = new Logging()
        return this._instance
    }
  }

  public logInfo(msg: LogMessage, context?: LogContext) {
    this._log(msg, LogLevel.INFO, context);
  }
  public logWarn(msg: LogMessage, context?: LogContext) {
    this._log(msg, LogLevel.WARN, context);
  }
  public logError(msg: LogMessage, context?: LogContext) {
    this._log(msg, LogLevel.ERROR, context);
  }
  public logDebug(msg: LogMessage, context?: LogContext) {
    if (process.env.NODE_ENV !== 'production') {
      this._log(msg, LogLevel.DEBUG, context); // Don't log debug in production
    }
  }

  private _log(msg: LogMessage, level: LogLevel, context?: LogContext) {
    this._logger.log(level, msg, {context: context});
  }

  private _initializeWinston() {
    const logger = winston.createLogger({
      transports: Logging._getTransports(),
    });
    return logger;
  }

  private static _getTransports() {
    const transports: Array<any> = [
      new winston.transports.Console({
        format: this._getFormatForConsole(),
      }),
    ];

    // if (process.env.NODE_ENV === 'production') {
      transports.push(this._getFileTransport()); // Also log file in production
    // }

    return transports;
  }

  private static _getFormatForConsole() {
    return format.combine(
      format.timestamp(),
      format.printf(
        info =>
          `[${info.timestamp}] [${info.level.toUpperCase()}]: ${
            info.message
          } [CONTEXT] -> ${
            info.context ? '\n' + JSON.stringify(info.context, null, 2) : '{}' // Including the context
          }`
      ),
      format.colorize({all: true})
    );
  }

  private static _getFileTransport() {
    return new DailyRotateFile({
      filename: `./logs/${Logging._appName}-%DATE%.log`,
      zippedArchive: true, // Compress gzip
      maxSize: '10m', // Rotate after 10MB
      maxFiles: '14d', // Only keep last 14 days
      format: format.combine(
        format.timestamp(),
        format(info => {
        //   console.log(info);
          info.app = this._appName;
          return info;
        })(),
        format.json()
      ),
    });
  }
}

export const logger = Logging.getInstance()