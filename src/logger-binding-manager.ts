import { NoopLogger } from './noop-logger';
import { LoggerBinding, LoggerFactory } from './logger-api';
import { LogFactoryImpl } from './logger-factory';

export interface LoggerBindingManager {
  registerBinding(binding: LoggerBinding): void;
}

export class LoggerBindingManagerImpl implements LoggerBindingManager {
  private readonly loggerFactory: LogFactoryImpl;

  constructor() {
    this.loggerFactory = new LogFactoryImpl(new NoopLogger());
  }

  public registerBinding(binding: LoggerBinding, silent = true) {
    if (!silent) {
      // tslint:disable-next-line:no-console
      console.log('Registering log binding:' + binding.vendor);
    }
    this.loggerFactory.bindLogger({ ...binding });
  }

  public get LoggerFactory(): LoggerFactory {
    return this.loggerFactory;
  }
}
