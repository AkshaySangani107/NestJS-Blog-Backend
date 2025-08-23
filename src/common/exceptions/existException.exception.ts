import { HttpStatus } from '@nestjs/common';
import { RpcBaseException } from '../exceptions/base/rpc-base.exception';

export class AllreadyExists extends RpcBaseException {
  constructor(
    objectOrError?: string | object,
  ) {
    super(
        objectOrError,
        HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
