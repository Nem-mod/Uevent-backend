import {
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { IBaseExceptionHandler } from '@app/common/database/base/base.exception.handler.interface';
import { catchError, Observable } from 'rxjs';
import { TypeORMError } from 'typeorm';

export abstract class BaseHttpTypeormExceptionInterceptor
  implements NestInterceptor
{
  abstract codeToHandler: Record<string, IBaseExceptionHandler>;

  abstract getCode(exception: TypeORMError): string;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((typeOrmException) => {
        // console.log('in typeorm interceptor before');
        // console.error(typeOrmException);
        if (!(typeOrmException instanceof TypeORMError)) throw typeOrmException;

        // console.log('in typeorm interceptor');
        // console.error(typeOrmException);
        throw (
          this.codeToHandler[this.getCode(typeOrmException)]?.handle(
            typeOrmException,
          ) || new InternalServerErrorException()
        );
      }),
    );
  }
}
