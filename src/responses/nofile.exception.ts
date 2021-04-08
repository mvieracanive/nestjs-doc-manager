import { HttpException, HttpStatus } from "@nestjs/common";

export class NoFileException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "File does not exist",
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

export class NoFileExceptionID extends HttpException {
  constructor(id: string | number) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "El archivo no existe. ID: " + id,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
