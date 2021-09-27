import { WinstonLogger } from '@payk/nestjs-winston';

const logger = new WinstonLogger('ApiMeasure');

export const ApiMeasure =
  (controlerName?: string) =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
      logger.verbose(generateLogMessagge('START'));
      const start = new Profiler(logger);
      const result = await Promise.resolve(originalMethod.apply(this, args));
      start.done({
        level: 'verbose',
        message: generateLogMessagge('END')
      });
      return result;

      function generateLogMessagge(msg: string) {
        return [
          `${controlerName ? controlerName + '.' : ''}${originalMethod.name}`,
          `(${args && args.length ? '...' : ''}) ${msg}`
        ].join('');
      }
    };

    return descriptor;
  };

  class Profiler {
    logger: WinstonLogger;
    start: number;
    /**
     * Constructor function for the Profiler instance used by
     * `Logger.prototype.startTimer`. When done is called the timer will finish
     * and log the duration.
     * @param {!Logger} logger - TODO: add param description.
     * @private
     */
    constructor(logger) {
      if (!logger) {
        throw new Error('Logger is required for profiling.');
      }
  
      this.logger = logger;
      this.start = Date.now();
    }
  
    /**
     * Ends the current timer (i.e. Profiler) instance and logs the `msg` along
     * with the duration since creation.
     * @returns {mixed} - TODO: add return description.
     * @private
     */
    done(...args) {
      if (typeof args[args.length - 1] === 'function') {
        // eslint-disable-next-line no-console
        console.warn('Callback function no longer supported as of winston@3.0.0');
        args.pop();
      }
  
      const info = typeof args[args.length - 1] === 'object' ? args.pop() : {};
      info.level = info.level || 'info';
      info.durationMs = Date.now() - this.start;
  
      return this.logger.log(info);
    }
  }
