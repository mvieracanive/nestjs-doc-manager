import { HttpException, HttpStatus } from '@nestjs/common';

export class DocModuleException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Document Module threw exception, check logs`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}