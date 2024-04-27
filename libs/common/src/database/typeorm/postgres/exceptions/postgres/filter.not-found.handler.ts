import { IBaseExceptionHandler } from '@app/common/database/base/base.exception.handler.interface';
import { QueryFailedError } from 'typeorm';
import { HttpException, NotFoundException } from '@nestjs/common';
import { DatabaseError } from 'pg';

export class FilterNotFoundHandler implements IBaseExceptionHandler {
  handle(exception: QueryFailedError): HttpException {
    return new NotFoundException(
      (exception.driverError as DatabaseError).detail,
    );
  }
}
