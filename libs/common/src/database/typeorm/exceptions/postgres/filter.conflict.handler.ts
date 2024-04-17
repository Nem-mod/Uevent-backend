import { IBaseExceptionHandler } from '@app/common/database/base/base.exception.handler.interface';
import { ConflictException, HttpException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { DatabaseError } from 'pg';

export class FilterConflictHandler implements IBaseExceptionHandler {
  handle(exception: QueryFailedError): HttpException {
    return new ConflictException(
      (exception.driverError as DatabaseError).detail,
    );
  }
}
