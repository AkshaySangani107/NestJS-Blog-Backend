import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";

import { RpcBaseException } from "../exceptions";

@Injectable()
export class RpcGlobalExceptionInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log("object");
    return next.handle().pipe(
      catchError((error) => {
        console.log(error);
        if (error.isRpc && !(error instanceof HttpException)) {
          throw new HttpException(error.payload, error.status);
        }
        if ( error.isPublic && !(error instanceof HttpException)) {
          throw new HttpException(error.payload, error.status);
        }
        if (error instanceof RpcBaseException) {
          throw new HttpException(error.getPayload(), error.getStatus());
        }
        throw error;
      }),
    );
  }
}