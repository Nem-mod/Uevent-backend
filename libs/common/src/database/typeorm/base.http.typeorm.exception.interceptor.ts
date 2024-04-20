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
  codeToHandler: Record<string, IBaseExceptionHandler>;

  abstract getCode(exception: TypeORMError): string;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((typeOrmException) => {
        if (!(typeOrmException instanceof TypeORMError)) throw typeOrmException;

        throw (
          this.codeToHandler[this.getCode(typeOrmException)]?.handle(
            typeOrmException,
          ) || new InternalServerErrorException()
        );
      }),
    );
  }
}
