import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error:
          'There has occured an internal database error, please check logs.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
