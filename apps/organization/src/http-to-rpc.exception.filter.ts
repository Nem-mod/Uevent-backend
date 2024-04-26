import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  RpcExceptionFilter,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { IRpcException } from './interfaces/rpc.exception.interface';

@Catch(HttpException)
export class HttpToRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const rpcExceptionBody: IRpcException = {
      response: exception.getResponse(),
      status: exception.getStatus() as HttpStatus,
      options: { cause: exception.cause },
    };
    const rpcException = new RpcException(rpcExceptionBody);

    return throwError(() => rpcException.getError());
  }
}
