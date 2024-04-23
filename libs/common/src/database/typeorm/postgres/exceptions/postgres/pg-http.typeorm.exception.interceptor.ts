import { BaseHttpTypeormExceptionInterceptor } from '@app/common/database/typeorm/base.http.typeorm.exception.interceptor';
import { IBaseExceptionHandler } from '@app/common/database/base/base.exception.handler.interface';
import { FilterConflictHandler } from '@app/common/database/typeorm/postgres/exceptions/postgres/filter.conflict.handler';
import { Catch } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { DatabaseError } from 'pg';

const codeToHandler: Record<string, IBaseExceptionHandler> = {
  23505: new FilterConflictHandler(),
};

@Catch(TypeORMError)
export class PgHttpTypeormExceptionInterceptor extends BaseHttpTypeormExceptionInterceptor {
  codeToHandler = codeToHandler;

  getCode(exception: TypeORMError): string {
    return (exception as DatabaseError).code;
  }
}
