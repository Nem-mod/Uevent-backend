import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { IRpcException } from './gateway/interfaces/rpc.exception.interface';

@Catch(RpcException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let exceptionBody = exception.getError() as IRpcException;

    if (exceptionBody.status) {
      response.status(exceptionBody.status).json(exceptionBody.response);
    } else {
      const httpError = new InternalServerErrorException();

      response.status(httpError.getStatus()).json(httpError.getResponse());
    }
  }
}
