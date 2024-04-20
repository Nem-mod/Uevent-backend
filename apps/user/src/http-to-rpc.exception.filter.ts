import {
  ArgumentsHost,
  Catch,
  HttpException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { IRpcException } from './interfaces/rpc.exception.interface';

@Catch(HttpException)
export class HttpToRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const rpcExceptionBody: IRpcException = {
      code: exception.getStatus(),
      message: exception.message,
    };
    const rpcException = new RpcException(rpcExceptionBody);

    return throwError(() => rpcException.getError());
  }
}
