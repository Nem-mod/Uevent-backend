import { BaseTypeormFilter } from '@app/common/database/typeorm/base.typeorm.filter';
import { IBaseExceptionHandler } from '@app/common/database/base/base.exception.handler.interface';
import { FilterConflictHandler } from '@app/common/database/typeorm/exceptions/postgres/filter.conflict.handler';
import { Catch } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

const codeToHandler: Record<string, IBaseExceptionHandler> = {
  23505: new FilterConflictHandler(),
};

@Catch(TypeORMError)
export class PostgresTypeormFilter extends BaseTypeormFilter {
  codeToHandler = codeToHandler;
}
