import { HttpStatus } from '@nestjs/common';
import { RpcBaseException } from '../exceptions/base/rpc-base.exception';

export class BadRequest extends RpcBaseException {
  constructor(
    objectOrError?: string | object,
  ) {
    super(
        objectOrError,
        HttpStatus.BAD_REQUEST
        
    );
  }
}
