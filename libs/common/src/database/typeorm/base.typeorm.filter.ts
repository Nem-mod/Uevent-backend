import {
  ArgumentsHost,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { IBaseExceptionHandler } from '@app/common/database/base/base.exception.handler.interface';

export abstract class BaseTypeormFilter implements ExceptionFilter {
  codeToHandler: Record<string, IBaseExceptionHandler>;
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = this.codeToHandler[exception.code]?.handle(exception);

    if (error) {
      // throw error;
      response.status(error.getStatus()).json(error.getResponse());
    } else {
      // throw InternalServerErrorException();
      response.status(500).json({ message: 'Internal server error' });
    }
  }
}
