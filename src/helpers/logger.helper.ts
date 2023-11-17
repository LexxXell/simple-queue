/**
 * Interface representing a Logger with various log levels.
 *
 * @remarks
 * - The logger supports log levels: 'info', 'log', 'warn', and 'error'.
 * - Each log level has a corresponding method to print log messages with appropriate formatting.
 *
 * @see {@link https://www.npmjs.com/package/colors}
 *
 * @example
 * ```typescript
 * import { ILogger, Logger } from './helpers';
 *
 * // Create a new Logger instance
 * const logger: ILogger = new Logger('Example');
 *
 * // Log messages at different levels
 * logger.info('Information message');
 * logger.log('Normal log message');
 * logger.warn('Warning message');
 * logger.error('Error message');
 * ```
 */
import 'colors';

// Define the ILogger interface
export interface ILogger {
  info(...data: any[]): void;
  log(...data: any[]): void;
  warn(...data: any[]): void;
  error(...data: any[]): void;
}

// Helper function to get the current timestamp in yellow color
const date = () => new Date().toISOString().yellow;

// Logger class implementing the ILogger interface
export class Logger implements ILogger {
  private namespace: string;

  /**
   * Creates a new instance of the Logger class.
   *
   * @param namespace - Optional namespace to prefix log messages.
   */
  constructor(namespace: string = '') {
    this.namespace = namespace;
  }

  /**
   * Log an information message.
   *
   * @param message - The information message to be logged.
   * @param optionalParams - Additional optional parameters to log.
   */
  info(message?: any, ...optionalParams: any[]): void {
    console.log(
      `${date()} ` + ' [INFO]'.bgWhite + ' ' + (this.namespace ? this.namespace + ': ' : '').green,
      message,
      ...optionalParams,
    );
  }

  /**
   * Log a normal log message.
   *
   * @param message - The log message to be logged.
   * @param optionalParams - Additional optional parameters to log.
   */
  log(message?: any, ...optionalParams: any[]): void {
    console.log(
      `${date()} ` + ' [LOG] '.bgGreen + ' ' + (this.namespace ? this.namespace + ': ' : '').green,
      message,
      ...optionalParams,
    );
  }

  /**
   * Log a warning message.
   *
   * @param message - The warning message to be logged.
   * @param optionalParams - Additional optional parameters to log.
   */
  warn(message?: any, ...optionalParams: any[]): void {
    console.log(
      `${date()} ` + ' [WARN]'.bgYellow + ' ' + (this.namespace ? this.namespace + ': ' : '').green,
      message,
      ...optionalParams,
    );
  }

  /**
   * Log an error message.
   *
   * @param message - The error message to be logged.
   * @param optionalParams - Additional optional parameters to log.
   */
  error(message?: any, ...optionalParams: any[]): void {
    console.log(
      `${date()} ` + '[ERROR]'.bgRed + ' ' + (this.namespace ? this.namespace + ': ' : '').green,
      message,
      ...optionalParams,
    );
  }
}
